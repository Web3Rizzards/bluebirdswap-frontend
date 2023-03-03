import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import { Web3Button } from '@web3modal/react'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="home" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}
        <HomePageTitle />
        {/* Rainbowkit Connect Button */}
        {/* <ConnectButton /> */}
        <Web3Button />
        {/* Greeter.sol Contract Interactions
        <GreeterContractInteractions /> */}
      </CenterBody>
    </>
  )
}

export default HomePage
