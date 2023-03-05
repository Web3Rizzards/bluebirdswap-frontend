import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import { Reconstruct } from '@components/fractionalize/Recontruct'

const FractionlizePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="reconstruct" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <Reconstruct />
      </CenterBody>
    </>
  )
}

export default FractionlizePage
