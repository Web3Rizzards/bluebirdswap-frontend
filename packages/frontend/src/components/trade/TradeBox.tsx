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
import { request, gql } from 'graphql-request'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import Image from 'next/image'
import { convertUnixToDatetime, getTimestampInSeconds } from '@shared/helpers'
import Link from 'next/link'
import { env } from '@shared/environment'

type CollectionResponse = {
  id: string
  name: string
  symbol: string
  link: string
}

type TokenResponse = {
  id: number
}

export const TradeBox: FC = () => {
  const [distances, setDistances] = useState(new Map())
  const [poolList, setPoolList] = useState<CollectionResponse[]>([])
  // const poolList = [
  //   {
  //     name: 'Blue Bird Yatch Club Pool',
  //     image: 'https://picsum.photos/200/200',
  //     id: 1,
  //     call: 50,
  //     put: 50,
  //     symbol: 'BBYC',
  //     expired: 1277857432,
  //     link: '/buybbyc',
  //   },
  //   {
  //     name: 'Azuki Pool',
  //     image: 'https://picsum.photos/200/200',
  //     id: 1,
  //     call: 50,
  //     put: 50,
  //     symbol: 'AZUKI',
  //     expired: 1277857432,
  //     link: '/buyazuki',
  //   },
  // ]

  const hoverStyle = {
    border: '4px solid white',
  }
  useEffect(() => {
    const getCollectionList = async () => {
      const response: {
        collections: CollectionResponse[]
      } = await request(
        env.graphEndPoint,
        gql`
          query getCollection {
            collections {
              id
              symbol
              name
              tokens {
                id
              }
            }
          }
        `,
        {},
      )
      console.log(response)
      setPoolList(
        response.collections.map((collection) => ({
          id: collection.id,
          name: collection.name,
          symbol: collection.symbol,
          link: collection.symbol === 'BBYC' ? '/buybbyc' : '/buyazuki',
        })),
      )
      console.log(poolList)
    }
    try {
      getCollectionList()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <Flex flexFlow="wrap">
        {/* TODO:TIMER Not yet don*/}
        {poolList.map((pool) => {
          // Update the count down every 1 second
          // const rn = getTimestampInSeconds()
          // setInterval(function () {
          //   const res = convertUnixToDatetime(pool.expired - rn)
          //   console.log(res)
          //   const oneDistance = distances.set(pool.id, res)
          //   setDistances(oneDistance)
          //   console.log(distances, distances.get(pool.id))
          //   // If the count down is finished, write some text
          // }, 1000)
          return (
            <VStack
              background="#1e2c37"
              _hover={hoverStyle}
              margin={3}
              padding={3}
              borderRadius="13px"
              key={pool.id}
            >
              <Link href={pool.link}>
                <Text>Time left : {distances.get(pool.id)}</Text>
                <VStack cursor="pointer" onClick={() => console.log('hh')}>
                  <Text fontWeight="700" fontSize="large">
                    {pool.name}
                  </Text>
                  {pool.symbol == 'BBYC' ? (
                    <Image
                      src="https://i.ibb.co/tby478L/BAYC-ICON.png"
                      alt="BAYC-ICON"
                      width={100}
                      height={100}
                    ></Image>
                  ) : (
                    <Image
                      src="https://i.ibb.co/GnRJ3X4/AZUKI-ICON.png"
                      alt="AZUKI-ICON"
                      width={100}
                      height={100}
                    ></Image>
                  )}
                </VStack>
                {/* <HStack display="flex" width="100%">
                  <Box flex={pool.call} background="red" height={3} />
                  <Box flex={pool.put} background="green" height={3} />
                </HStack> */}
              </Link>
            </VStack>
          )
        })}
      </Flex>
    </>
  )
}
