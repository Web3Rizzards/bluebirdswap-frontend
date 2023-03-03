import { Box, Button, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC } from 'react'
import 'twin.macro'

export const SwapBox: FC = () => {
  // TODO: connect with the backend
  const nftName = 'BAYC #123'
  const nftList = [
    {
      name: 'BAYC #123',
      id: 1,
    },
    {
      name: 'BAYC #133',
      id: 2,
    },
  ]
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
          <Select>
            {nftList.map((nft) => (
              <option value={nft.name} key={nft.id}>
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
          <Text>1,000,000 bb{nftName}</Text>
        </Flex>
        <Button
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
      </VStack>
    </>
  )
}
