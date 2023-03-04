import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import { ClaimBox } from '@components/claim/ClaimBox'

const ClaimPage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="claim" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <ClaimBox />
      </CenterBody>
    </>
  )
}

export default ClaimPage
