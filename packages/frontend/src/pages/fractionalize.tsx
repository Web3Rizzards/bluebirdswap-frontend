import 'twin.macro'

import { CenterBody } from '@components/layout/CenterBody'
import { HomeTopBar } from '@components/home/HomeTopBar'
import type { NextPage } from 'next'
import { SwapBox } from '@components/fractionalize/SwapBox'

const FractionlizePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="fractionalize" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <SwapBox />
      </CenterBody>
    </>
  )
}

export default FractionlizePage
