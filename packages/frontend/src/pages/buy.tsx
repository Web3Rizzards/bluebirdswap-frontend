import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { GreeterContractInteractions } from '@components/web3/GreeterContractInteractions'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { Web3Button } from '@web3modal/react'
import 'twin.macro'
import Image from 'next/image'
import { Exchange } from '@components/exchange/Exchange'
import { TradeBox } from '@components/trade/TradeBox'

const Buy: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="trade" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <Exchange
          strikePrices={[
            { price: 9, isPut: true },
            { price: 10, isPut: true },
            { price: 11, isPut: true },
            { price: 13, isPut: false },
            { price: 14, isPut: false },
            { price: 15, isPut: false },
          ]}
          collectionName="BlueBird Yacht Club"
          startDate={new Date()}
          endDate={new Date()}
        />
        {/* Title */}
      </CenterBody>
    </>
  )
}

export default Buy
