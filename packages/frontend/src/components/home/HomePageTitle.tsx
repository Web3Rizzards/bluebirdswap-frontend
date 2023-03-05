import { Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC } from 'react'
import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = 'BLUEBIRD SWAP'
  const desc = 'EVM-based Smart Contract & DApp Development Boilerplate'
  const githubHref = 'https://github.com/scio-labs/ethathon'
  const deployHref = 'https://github.com/scio-labs/ethathon#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <h1 tw="mt-4 font-black text-5xl tracking-tight underline-offset-4 group-hover:underline">
          {title}
        </h1>
      </div>
    </>
  )
}
