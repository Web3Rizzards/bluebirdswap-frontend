import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import Image from 'next/image'
import { convertUnixToDatetime, getTimestampInSeconds } from '@shared/helpers'
import Link from 'next/link'

export const TradeBox: FC = () => {
  const [distances, setDistances] = useState(new Map())

  const poolList = [
    {
      name: 'Blue Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 1,
      call: 70,
      put: 30,
      expired: 1277857432,
    },
    {
      name: 'Red Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 2,
      call: 60,
      put: 40,
      expired: 1677857432,
    },
    {
      name: 'Gray Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 3,
      call: 20,
      put: 80,
      expired: 1677857432,
    },
    {
      name: 'Gray2 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 4,
      call: 70,
      put: 30,
      expired: 1677857432,
    },
    {
      name: 'Gray3 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 5,
      call: 50,
      put: 50,
      expired: 1667857432,
    },
    {
      name: 'Gray4 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 6,
      call: 90,
      put: 10,
      expired: 1677857432,
    },
  ]

  const hoverStyle = {
    border: '4px solid white',
  }
  useEffect(() => {
    console.log(distances, 'hihihihi')
  }, [distances])

  return (
    <>
      <Flex flexFlow="wrap">
        {/* TODO:TIMER Not yet don*/}
        {poolList.map((pool) => {
          // Update the count down every 1 second
          const rn = getTimestampInSeconds()
          setInterval(function () {
            const res = convertUnixToDatetime(pool.expired - rn)
            console.log(res)
            const oneDistance = distances.set(pool.id, res)
            setDistances(oneDistance)
            console.log(distances, distances.get(pool.id))
            // If the count down is finished, write some text
          }, 1000)
          return (
            <VStack
              background="#1e2c37"
              _hover={hoverStyle}
              margin={3}
              padding={3}
              borderRadius="13px"
              key={pool.id}
            >
              <Link href="/buy">
                <Text>Time left : {distances.get(pool.id)}</Text>
                <VStack cursor="pointer" onClick={() => console.log('hh')}>
                  <Text fontWeight="700" fontSize="large">
                    {pool.name}
                  </Text>
                  <Image src={pool.image} width={200} height={200} alt="pic" />
                </VStack>
                <HStack display="flex" width="100%">
                  <Box flex={pool.call} background="red" height={3} />
                  <Box flex={pool.put} background="green" height={3} />
                </HStack>
              </Link>
            </VStack>
          )
        })}
      </Flex>
    </>
  )
}
