import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import { StakeBox } from '@components/stake/StakeBox'

const StakePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="stake" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <StakeBox />
      </CenterBody>
    </>
  )
}

export default StakePage
