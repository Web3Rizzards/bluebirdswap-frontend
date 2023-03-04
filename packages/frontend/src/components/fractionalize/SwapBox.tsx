import { Box, Button, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { request, gql } from 'graphql-request'
import { FC, useEffect, useState } from 'react'
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

type CollectionResponse = {
  id: string
  name: string
  tokens: TokenResponse[] | null
}
type TokenResponse = {
  id: number
}

type Token = {
  id: string
  owner: string
  tokenId: string
  collection: TokenResponse[]
}

export const grinderAddress = '0xE3641277B8450e174a2Dea656649a3A1EBcEb2BE'
export const optionsAddress = '0x71231BBda865651A86699D53FEF1A39B60bF0bf8'

export const SwapBox: FC = () => {
  // TODO: connect with the backend
  const [nftName, setNftName] = useState('#')
  const [nftList, setData] = useState<CollectionResponse[]>([])
  const [tokenList, setTokenList] = useState<Token[]>([])
  const [selectedToken, setSelectedToken] = useState<number>()
  const { address } = useAccount()
  const { data, isError, isLoading } = useContractRead({
    address: nftName,
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    args: [address, grinderAddress],
  })

  const { config } = usePrepareContractWrite({
    abi: grinderABI,
    address: grinderAddress,
    functionName: 'fractionalizeNFT',
    args: [nftName, selectedToken],
  })
  const { write, isLoading: grindLoading } = useContractWrite(config)

  const { config: nftConfig } = usePrepareContractWrite({
    abi: erc721ABI,
    address: nftName,
    functionName: 'setApprovalForAll',
    args: [grinderAddress, true],
  })

  const { write: approveNft, isLoading: approveLoading } = useContractWrite(nftConfig)

  const handleSelectNFT = async (e: any) => {
    const nft = e.target.value
    setNftName(nft)
    const response: { tokens: Token[] } = await request(
      'https://api.studio.thegraph.com/query/43349/bluebird-swap-goerli/v1.0.0',
      gql`
        query GetTokensByOwnerAndCollection($owner: Bytes!, $collection: Bytes) {
          tokens(where: { owner: $owner, collection: $collection }) {
            id
            owner
            tokenId
            collection {
              id
            }
          }
        }
      `,
      { owner: address, collection: nft },
    )
    setTokenList(response.tokens)
    setSelectedToken(0)
    console.log(response)
  }

  const handleSelectId = async (e: any) => {
    const tokenId = e.target.value
    setSelectedToken(tokenId)
  }

  const fractionalise = () => {
    console.log(config)
    write?.()
  }

  const approve = () => {
    console.log('dd')
    approveNft?.()
  }

  useEffect(() => {
    const getCollectionList = async () => {
      const response: {
        collections: CollectionResponse[]
      } = await request(
        'https://api.studio.thegraph.com/query/43349/bluebird-swap-goerli/v1.0.0',
        gql`
          query getCollection {
            collections {
              id
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
      setData(
        response.collections.map((collection) => ({
          id: collection.id,
          name: collection.name,
          tokens: [],
        })),
      )
    }
    try {
      getCollectionList()
    } catch (error) {
      console.log(error)
    }
  }, [])
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
              <option value={nft.id} key={nft.id}>
                {nft.name}
              </option>
            ))}
          </Select>
          <Select placeholder="Select Token ID" onChange={handleSelectId}>
            {tokenList.map((token) => (
              <option value={token.tokenId} key={token.tokenId}>
                {token.tokenId}
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
            {nftList.find((nft) => nft.id === nftName)
              ? nftList.find((nft) => nft.id === nftName)?.name
              : ''}
            #{selectedToken}
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
