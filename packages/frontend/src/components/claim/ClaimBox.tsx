import { Box, Button, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC, useState } from 'react'
import 'twin.macro'

export const ClaimBox: FC = () => {
  const [nftName, setNftName] = useState('#')

  const historyList = [
    {
      name: 'Blue Bird Yatch Club Pool #1',
      image: 'https://picsum.photos/200/200',
      id: 1,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: true,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
    {
      name: 'Blue Bird Yatch Club Pool #2',
      image: 'https://picsum.photos/200/200',
      id: 2,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: true,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
    {
      name: 'Blue Bird Yatch Club Pool #3',
      image: 'https://picsum.photos/200/200',
      id: 3,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: true,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
  ]
  const handleSelectNFT = (e: any) => {
    const nft = e.target.value
    setNftName(nft)
  }
  return <></>
}
