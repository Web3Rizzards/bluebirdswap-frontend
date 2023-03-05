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
  const buttonStyle = {
    position: 'absolute',
    top: '45%',
    left: '42%',
    width: '17em',
    height: '4em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const { isConnected } = useAccount()
  return (
    <>
      {isConnected ? (
        <>
          {' '}
          <HomeTopBar url="home" />
          <CenterBody tw="mt-20 mb-10 px-5">
            <HomePageTitle />
          </CenterBody>{' '}
        </>
      ) : (
        <CenterBody tw="px-5">
          <Image src={landing} alt="pic" />
          <Flex style={buttonStyle}>
            <ConnectButton />
          </Flex>
        </CenterBody>
      )}
    </>
  )
}

export default HomePage
