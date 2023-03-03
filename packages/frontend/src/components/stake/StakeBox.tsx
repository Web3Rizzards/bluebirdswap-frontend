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
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FC, useState } from 'react'
import 'twin.macro'
import Image from 'next/image'

export const StakeBox: FC = () => {
  const [clickedId, setClickedId] = useState(0)
  const [swapAmount, setSwapAmount] = useState(0)
  const poolList = [
    {
      name: 'Blue Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 1,
    },
    {
      name: 'Red Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 2,
    },
    {
      name: 'Gray Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 3,
    },
    {
      name: 'Gray2 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 4,
    },
    {
      name: 'Gray3 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 5,
    },
    {
      name: 'Gray4 Bird Yatch Club Pool',
      image: 'https://picsum.photos/200/200',
      id: 6,
    },
  ]

  const hoverStyle = {
    border: '4px solid white',
  }

  const handleClick = (poolId: number) => {
    setClickedId(poolId)
  }

  const handleInput = (e: any) => {
    const res = e.target.value
    setSwapAmount(res)
  }
  return (
    <>
      <Flex flexFlow="wrap">
        {poolList.map((pool) => (
          <VStack
            background="#1e2c37"
            _hover={hoverStyle}
            margin={3}
            padding={3}
            borderRadius="13px"
            key={pool.id}
          >
            <VStack cursor="pointer" onClick={() => handleClick(pool.id)}>
              <Text fontWeight="700" fontSize="large">
                {pool.name}
              </Text>
              <Image src={pool.image} width={200} height={200} alt="pic" />
            </VStack>
            {clickedId === pool.id ? (
              <FormControl gap={2}>
                <FormLabel>Swap Amount</FormLabel>
                <Input
                  type="number"
                  onChange={handleInput}
                  value={swapAmount}
                  placeholder="Type your amount"
                />
                <Select>
                  <option>ETH</option>
                  <option>bbNFT</option>
                </Select>
                <Button width="inherit">Stake</Button>
              </FormControl>
            ) : (
              <></>
            )}
          </VStack>
        ))}
      </Flex>
    </>
  )
}
