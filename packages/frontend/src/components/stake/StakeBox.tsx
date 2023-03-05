import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Toast,
  VStack,
} from '@chakra-ui/react'
import { request, gql } from 'graphql-request'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import Image from 'next/image'
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import optionABI from '../../shared/abi/options.json'
import { BigNumber, ethers } from 'ethers'
import {
  azukiAddress,
  azukiFractionalizeAddress,
  azukiOptionsAddress,
  fractionalizeAddress,
  grinderAddress,
  nftAddress,
  optionsAddress,
} from '@components/exchange/Exchange'
import { formatEther, parseEther } from 'ethers/lib/utils.js'
import { env } from '@shared/environment'

type CollectionResponse = {
  id: string
  name: string
  symbol: string
  tokens: TokenResponse[] | []
  tokenAddress: string
  address: string
}
type TokenResponse = {
  id: number
}

export const StakeBox: FC = () => {
  const [clickedId, setClickedId] = useState('')
  const [swapAmount, setSwapAmount] = useState(0)
  const [coin, setCoin] = useState('ETH')
  const [poolList, setPoolList] = useState<CollectionResponse[]>([])

  const [selectedPool, setPool] = useState<CollectionResponse>()
  const { address } = useAccount()
  const {
    data: nftBalance,
    isError,
    isLoading,
  } = useBalance({
    address: address ?? '0x',
    token: selectedPool?.tokenAddress as any,
  })
  console.log(selectedPool?.tokenAddress)
  const {
    data: ethBalance,
    isError: ethError,
    isLoading: ethIsLoading,
  } = useBalance({
    address: address ?? '0x',
  })

  const { data: allowance } = useContractRead({
    address: selectedPool?.tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address ?? '0x', (grinderAddress as any) ?? '0x'],
  })

  const { config: allowanceConfig, error: approveError } = usePrepareContractWrite({
    abi: erc20ABI,
    address: selectedPool?.tokenAddress,
    functionName: 'approve',
    args: [(grinderAddress as any) ?? '0x', parseEther('1000000000000000')],
  })
  const { write: approve, isLoading: approveLoading } = useContractWrite(allowanceConfig)

  const { config: nftConfig, error: depositNFTError } = usePrepareContractWrite({
    abi: optionABI,
    address: selectedPool?.address,
    functionName: 'depositNftToken',
    args: [ethers.utils.parseEther(+swapAmount ? swapAmount + '' : '0')],
  })
  const { write: depositNFT, isLoading: depositNFTLoading } = useContractWrite(nftConfig)

  const { config, error: depositETHError } = usePrepareContractWrite({
    abi: optionABI,
    address: selectedPool?.address,
    functionName: 'depositETH',
    args: [],
    overrides: {
      value: ethers.utils.parseEther(+swapAmount ? swapAmount + '' : '0'),
    },
  })

  const { write, isLoading: depositETHLoading } = useContractWrite(config)

  const hoverStyle = {
    border: '4px solid white',
  }

  const handleClick = (poolId: string) => {
    setClickedId(poolId)
    const p = poolList.find((pool) => poolId === pool.id)
    if (p) {
      setPool(p)
    }
  }

  const handleInput = (e: any) => {
    const res = e.target.value
    setSwapAmount(res)
  }
  console.log('coin', coin, 'poolList', poolList)
  const handleStake = () => {
    try {
      if (coin === 'ETH') {
        write?.()
      } else {
        depositNFT?.()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = () => {
    approve?.()
  }

  const setType = (e: any) => {
    setCoin(e.target.value)
  }
  useEffect(() => {
    const getCollectionList = async () => {
      const response: {
        collections: CollectionResponse[]
      } = await request(
        env.graphEndPoint,
        gql`
          query getCollection {
            collections {
              id
              symbol
              name
              tokens {
                id
              }
            }
          }
        `,
        {},
      )
      console.log(response)
      setPoolList(
        response.collections.map((collection) => ({
          id: collection.id,
          name: collection.name,
          symbol: collection.symbol,
          address: collection.symbol === 'BBYC' ? optionsAddress : azukiOptionsAddress,
          tokenAddress:
            collection.symbol === 'BBYC' ? fractionalizeAddress : azukiFractionalizeAddress,
          tokens: [],
        })),
      )
      console.log(poolList)
    }
    try {
      getCollectionList()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <>
      {(depositETHError || depositNFTError) && (
        <Toast title={'Liquidity Providing Period has ended'}></Toast>
      )}
      <Flex flexFlow="wrap">
        {poolList.map((pool) => (
          <VStack
            background="#1e2c37"
            _hover={hoverStyle}
            margin={3}
            padding={3}
            borderRadius="13px"
            key={pool.id}
          >
            <VStack cursor="pointer" onClick={() => handleClick(pool.id)}>
              <Text fontWeight="700" fontSize="large">
                {pool.name}
              </Text>
              {pool.symbol == 'BBYC' ? (
                <Image
                  src="https://i.ibb.co/tby478L/BAYC-ICON.png"
                  alt="BAYC-ICON"
                  width={100}
                  height={100}
                ></Image>
              ) : (
                <Image
                  src="https://i.ibb.co/GnRJ3X4/AZUKI-ICON.png"
                  alt="AZUKI-ICON"
                  width={100}
                  height={100}
                ></Image>
              )}
            </VStack>

            {clickedId === pool.id ? (
              <FormControl gap={2}>
                <FormLabel>Swap Amount</FormLabel>
                <Text>
                  Balance:{' '}
                  {coin !== 'ETH'
                    ? formatEther(nftBalance?.value ? nftBalance?.value : BigNumber.from(0)) +
                      ' ' +
                      pool.symbol
                    : formatEther(ethBalance?.value ? ethBalance?.value : BigNumber.from(0)) +
                      ' ETH'}
                </Text>
                <Input
                  type="number"
                  onChange={handleInput}
                  value={swapAmount}
                  placeholder="Type your amount"
                />
                <Select value={coin} onChange={(e) => setType(e)}>
                  <option>ETH</option>
                  <option>{pool.symbol}</option>
                </Select>
                {allowance?.lt(BigNumber.from('100000000')) ? (
                  <Button
                    isLoading={approveLoading}
                    onClick={() => handleApprove()}
                    width="inherit"
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    isLoading={depositNFTLoading || depositETHLoading}
                    onClick={() => handleStake()}
                    width="inherit"
                  >
                    Stake
                  </Button>
                )}
              </FormControl>
            ) : (
              <></>
            )}
          </VStack>
        ))}
      </Flex>
    </>
  )
}
