import { Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { FC } from 'react'
import 'twin.macro'

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
        <Text fontSize="x-large">BLUEBIRD SWAP</Text>
        <HStack width="50%" justifyContent="space-between">
          <Link href="/fractionlize">
            <Text sx={url == 'fractionlize' ? SelectedStyles : nonSelectedStyles}>
              Fractionlize
            </Text>
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
