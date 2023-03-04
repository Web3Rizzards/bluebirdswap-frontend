import { Box, Button, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC, useState } from 'react'
import 'twin.macro'
import grinderABI from '../../shared/abi/grinder.json'
import erc721ABI from '../../shared/abi/erc721.json'
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
} from 'wagmi'
import { azukiAddress, grinderAddress, nftAddress } from '@components/exchange/Exchange'

export const SwapBox: FC = () => {
  // TODO: connect with the backend
  const [nftName, setNftName] = useState('#')
  const { address } = useAccount()
  const { data, isError, isLoading } = useContractRead({
    address: nftName,
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    args: [address, grinderAddress],
  })

  console.log('isApprovedForAll', data)

  const { config } = usePrepareContractWrite({
    abi: grinderABI,
    address: grinderAddress,
    functionName: 'fractionalizeNFT',
    args: [nftName, 4],
  })
  const { write, isLoading: grindLoading } = useContractWrite(config)

  const { config: nftConfig } = usePrepareContractWrite({
    abi: erc721ABI,
    address: nftName,
    functionName: 'setApprovalForAll',
    args: [grinderAddress, true],
  })

  const { write: approveNft, isLoading: approveLoading } = useContractWrite(nftConfig)

  const nftList = [
    {
      name: 'BBYC',
      address: nftAddress,
      id: 1,
    },
    {
      name: 'AZUKI',
      address: azukiAddress,
      id: 2,
    },
  ]
  const handleSelectNFT = (e: any) => {
    const nft = e.target.value
    setNftName(nft)
  }

  const fractionalise = () => {
    write?.()
  }

  const approve = () => {
    approveNft?.()
  }

  console.log(data)
  return (
    <>
      <VStack
        gap={3}
        background="#13212D"
        padding={29}
        borderRadius={12}
        maxWidth="60%"
        width="100%"
        display="flex"
        alignItems="baseline"
      >
        <Text fontSize="x-large" fontWeight={700}>
          Fractionalize
        </Text>
        <Flex
          background="white"
          width="100%"
          borderRadius="16px"
          padding="30px"
          color="black"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Select placeholder="Select NFT" onChange={handleSelectNFT}>
            {nftList.map((nft) => (
              <option value={nft.address} key={nft.id}>
                {nft.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Box
          padding="0px 9px"
          fontSize="x-large"
          background="black"
          borderRadius="10px"
          position="absolute"
          bottom="50%"
          left="48.5%"
        >
          <ChevronDownIcon />
        </Box>
        <Flex
          background="#2d3748"
          width="100%"
          borderRadius="16px"
          padding="30px"
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <Text>
            1,000,000{' '}
            {nftList.find((nft) => nft.address === nftName)
              ? nftList.find((nft) => nft.address === nftName)?.name
              : ''}
          </Text>
        </Flex>
        {data ? (
          <Button
            isLoading={grindLoading}
            onClick={() => {
              fractionalise()
            }}
            background="#4A99E9"
            width="100%"
            borderRadius="16px"
            padding="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text>Swap</Text>
          </Button>
        ) : (
          <Button
            isLoading={approveLoading}
            onClick={() => {
              approve()
            }}
            background="#4A99E9"
            width="100%"
            borderRadius="16px"
            padding="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text>Approve</Text>
          </Button>
        )}
      </VStack>
    </>
  )
}
