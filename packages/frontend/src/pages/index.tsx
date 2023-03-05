import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import Image from 'next/image'
import 'twin.macro'
import { useAccount } from 'wagmi'

import landing from 'public/images/landing-cover.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex } from '@chakra-ui/react'

const HomePage: NextPage = () => {
  const { isConnected } = useAccount()
  return (
    <>
      {isConnected ? (
        <>
          {' '}
          <HomeTopBar url="home" />
          <CenterBody tw="px-5">
            <Image src={landing} alt="pic" />
          </CenterBody>{' '}
        </>
      ) : (
        <CenterBody tw="px-5">
          <Image src={landing} alt="pic" />
          <Flex position="absolute" top="45%" left="45%">
            <ConnectButton />
          </Flex>
        </CenterBody>
      )}
    </>
  )
}

export default HomePage
