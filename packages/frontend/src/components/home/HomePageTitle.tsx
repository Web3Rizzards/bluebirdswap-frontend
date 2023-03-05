import 'twin.macro'

import BluebirdLogo from 'public/images/bluebird-logo.png'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'

export const HomePageTitle: FC = () => {
  const title = 'BLUEBIRD SWAP'
  const desc = 'EVM-based Smart Contract & DApp Development Boilerplate'
  const githubHref = 'https://github.com/scio-labs/ethathon'
  const deployHref = 'https://github.com/scio-labs/ethathon#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <h1 tw="mt-4 font-black text-5xl tracking-tight underline-offset-4 group-hover:underline">
          <Image src={BluebirdLogo} alt="bb-logo"></Image>
        </h1>
      </div>
    </>
  )
}
