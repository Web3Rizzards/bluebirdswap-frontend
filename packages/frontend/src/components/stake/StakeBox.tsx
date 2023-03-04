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
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FC, useState } from 'react'
import 'twin.macro'
import Image from 'next/image'
import { optionsAddress } from '@components/fractionalize/SwapBox'
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi'
import optionABI from '../../shared/abi/options.json'
import { BigNumber, ethers } from 'ethers'
import { fractionalizeAddress, nftAddress } from '@components/exchange/Exchange'
import { formatEther } from 'ethers/lib/utils.js'

export const StakeBox: FC = () => {
  const [clickedId, setClickedId] = useState(0)
  const [swapAmount, setSwapAmount] = useState(0)
  const [coin, setCoin] = useState('ETH')

  const poolList = [
    {
      name: 'Blue Bird Yatch Club Pool',
      token: 'BBYC',
      image: 'https://picsum.photos/200/200',
      tokenAddress: fractionalizeAddress,
      address: optionsAddress,
      id: 1,
    },
    {
      name: 'Red Bird Yatch Club Pool',
      token: 'RBYC',
      image: 'https://picsum.photos/200/200',
      address: optionsAddress,
      tokenAddress: fractionalizeAddress,
      id: 2,
    },
    {
      name: 'Gray Bird Yatch Club Pool',
      token: 'GBYC',
      image: 'https://picsum.photos/200/200',
      address: optionsAddress,
      tokenAddress: fractionalizeAddress,
      id: 3,
    },
    {
      name: 'Gray2 Bird Yatch Club Pool',
      token: 'G2BYC',
      image: 'https://picsum.photos/200/200',
      address: optionsAddress,
      tokenAddress: fractionalizeAddress,
      id: 4,
    },
    {
      name: 'Gray3 Bird Yatch Club Pool',
      token: 'G3BYC',
      image: 'https://picsum.photos/200/200',
      address: optionsAddress,
      tokenAddress: fractionalizeAddress,
      id: 5,
    },
    {
      name: 'Gray4 Bird Yatch Club Pool',
      token: 'G4BYC',
      image: 'https://picsum.photos/200/200',
      address: optionsAddress,
      tokenAddress: fractionalizeAddress,
      id: 6,
    },
  ]
  const [selectedPool, setPool] = useState(poolList[0])
  const { address } = useAccount()
  const {
    data: nftBalance,
    isError,
    isLoading,
  } = useBalance({
    address: address ?? '0x',
    token: selectedPool.tokenAddress as any,
  })
  const {
    data: ethBalance,
    isError: ethError,
    isLoading: ethIsLoading,
  } = useBalance({
    address: address ?? '0x',
  })

  const { config: nftConfig, error: depositNFTError } = usePrepareContractWrite({
    abi: optionABI,
    address: selectedPool.address,
    functionName: 'depositNftToken',
    args: [ethers.utils.parseEther(+swapAmount ? swapAmount + '' : '0')],
  })
  const { write: depositNFT, isLoading: depositNFTLoading } = useContractWrite(nftConfig)

  const { config, error: depositETHError } = usePrepareContractWrite({
    abi: optionABI,
    address: selectedPool.address,
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

  const handleClick = (poolId: number) => {
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

  const setType = (e: any) => {
    setCoin(e.target.value)
  }
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
              <Image src={pool.image} width={200} height={200} alt="pic" />
            </VStack>
            {clickedId === pool.id ? (
              <FormControl gap={2}>
                <FormLabel>Swap Amount</FormLabel>
                <Text>
                  Balance:{' '}
                  {coin !== 'ETH'
                    ? formatEther(nftBalance?.value ? nftBalance?.value : BigNumber.from(0)) +
                      ' ' +
                      pool.token
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
                  <option>{pool.token}</option>
                </Select>
                <Button
                  isLoading={depositNFTLoading || depositETHLoading}
                  onClick={() => handleStake()}
                  width="inherit"
                >
                  Stake
                </Button>
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
