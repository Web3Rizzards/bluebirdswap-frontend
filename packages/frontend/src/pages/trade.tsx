import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import Image from 'next/image'
import { Exchange } from '@components/exchange/Exchange'
import { TradeBox } from '@components/trade/TradeBox'

const TradePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="trade" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <TradeBox />
        <Exchange
          floorPrice={10}
          strikePrices={[
            { price: 9, isPut: true },
            { price: 10, isPut: true },
            { price: 11, isPut: true },
            { price: 13, isPut: false },
            { price: 14, isPut: false },
            { price: 15, isPut: false },
          ]}
          collectionName="BAYC"
          startDate={new Date()}
          endDate={new Date()}
        />
        {/* Title */}
      </CenterBody>
    </>
  )
}

export default TradePage
