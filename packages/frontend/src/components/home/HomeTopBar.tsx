import 'twin.macro'

import { Button, Flex, HStack, Text } from '@chakra-ui/react'

import BluebirdLogo from 'public/images/bluebird-logo.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  url: string
}

export const HomeTopBar: FC<Props> = ({ url }) => {
  const nonSelectedStyles = {
    fontSize: 'larger',
    fontWeight: '600',
    color: '#a5a5a5',
  }

  const SelectedStyles = {
    fontSize: 'larger',
    fontWeight: '600',
    color: 'white',
    textDecoration: 'underline',
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding={6} background="#1E2C37">
        {/* TODO : LOGO */}
        <Link href="/">
          <Image src={BluebirdLogo} alt="bb-logo"></Image>

          {/* <Text fontSize="x-large">BLUEBIRD SWAP</Text> */}
        </Link>

        <HStack width="40%" justifyContent="space-between">
          <Link href="/fractionlize">
            <Text sx={url == 'fractionalize' ? SelectedStyles : nonSelectedStyles}>
              Fractionlize
            </Text>
          </Link>
          <Link href="/reconstruct">
            <Text sx={url == 'reconstruct' ? SelectedStyles : nonSelectedStyles}>Reconstruct</Text>
          </Link>
          <Link href="/stake">
            <Text sx={url == 'stake' ? SelectedStyles : nonSelectedStyles}>Stake</Text>
          </Link>
          <Link href="/trade">
            <Text sx={url == 'trade' ? SelectedStyles : nonSelectedStyles}>Trade</Text>
          </Link>
          <Link href="/claim">
            <Text sx={url == 'claim' ? SelectedStyles : nonSelectedStyles}>Claim</Text>
          </Link>
        </HStack>
        <ConnectButton />
      </Flex>
    </>
  )
}
