import { Box, Button, Flex, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import 'twin.macro'

const data = [
  {
    name: 'Page A',
    pv: 13,
  },
  {
    name: 'Page B',
    pv: 14,
  },
  {
    name: 'Page C',
    pv: 13,
  },
  {
    name: 'Page D',
    pv: 12,
  },
  {
    name: 'Page E',
    pv: 13,
  },
  {
    name: 'Page F',
    pv: 14,
  },
  {
    name: 'Page G',
    pv: 15,
  },
]
type StrikePrice = {
  isPut: boolean
  price: number
}
type ExchangeProps = {
  collectionName: string
  startDate: Date
  endDate: Date
  strikePrices: StrikePrice[]
  floorPrice: number
}
export const Exchange: FC<ExchangeProps> = ({
  collectionName,
  startDate,
  endDate,
  strikePrices,
  floorPrice,
}) => {
  const [type, setType] = useState('Call')
  const [profit, setProfit] = useState(7.3)
  const [loss, setLoss] = useState(7)
  const [cost, setCost] = useState(0)
  const [balance, setBalance] = useState(7)
  const renderOptions = (strike: StrikePrice) => {
    return (
      <Box
        width={'132px'}
        height={'32px'}
        background={strike.isPut ? '#E93E4E' : '#5B9C4B'}
        margin={'3px'}
        borderRadius={'10px'}
      >
        {' '}
        <Text margin={'inherit'} textAlign={'center'}>
          {strike.price + ' ETH'}
        </Text>{' '}
      </Box>
    )
  }

  return (
    <>
      <div>
        <Text>{collectionName}</Text>
        <Text>{startDate.toLocaleDateString()}</Text>
        <Text>Expires {endDate.toLocaleDateString()}</Text>
        {/* <ResponsiveContainer width="100%"> */}
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin - 5', 'dataMax + 2']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          {strikePrices.map((price, i) => {
            return (
              <ReferenceLine
                key={i}
                y={price.price}
                stroke={price.isPut ? '#FF0000' : '#00FF00'}
                strokeDasharray="3 3"
              />
            )
          })}
          {/* <Line type="monotone" dataKey="put1" stroke="#FF0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="put2" stroke="#FF0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="put3" stroke="#FF0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="call1" stroke="#00FF00" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="call2" stroke="#00FF00" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="call3" stroke="#00FF00" activeDot={{ r: 8 }} /> */}
        </LineChart>
        {/* </ResponsiveContainer> */}
        <Text>Current Floor Price</Text>
        <Text>{floorPrice}</Text>
        <Box height={'56px'} background={'#FFFFFF'} margin={'3px'} borderRadius={'20px'}>
          {' '}
          <Text fontSize={'20px'} color={'#000000'} margin={'inherit'} textAlign={'center'}>
            {floorPrice}
          </Text>{' '}
        </Box>
        <Flex justifyContent={'space-between'}>
          <Box width={'50%'} margin={'3px'} padding={3}>
            {' '}
            Put{' '}
          </Box>
          <Box width={'50%'} margin={'3px'} padding={3}>
            {' '}
            Call{' '}
          </Box>
        </Flex>
        <Flex justifyContent={'space-between'}>
          {renderOptions(strikePrices[0])}
          {renderOptions(strikePrices[3])}
        </Flex>
        <Flex justifyContent={'space-between'}>
          {renderOptions(strikePrices[1])}
          {renderOptions(strikePrices[4])}
        </Flex>
        <Flex justifyContent={'space-between'}>
          {renderOptions(strikePrices[2])}
          {renderOptions(strikePrices[5])}
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text>Amount</Text>
          <Text>Balance: </Text>
        </Flex>
        <Input
          height={'56px'}
          background={'#FFFFFF'}
          color={'black'}
          textAlign={'center'}
          margin={'3px'}
          borderRadius={'20px'}
        ></Input>
        {/* Divider */}
        <Flex justifyContent={'space-between'}>
          <Text>Strategy</Text>
          <Text>{type}</Text>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text>Profit Zone</Text>
          <Text>{(type === 'Call' ? '> ' : '< ') + profit.toString()}</Text>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Text>Max Loss Zone</Text>
          <Text>{(type === 'Call' ? '< ' : '> ') + loss.toString()}</Text>
        </Flex>
        {/* Divider */}
        <Flex justifyContent={'space-between'}>
          <Text>Total Cost</Text>
          <Text>{cost}</Text>
        </Flex>

        <Flex justifyContent={'space-between'}>
          <Text>Your Balance</Text>
          <Text>{balance}</Text>
        </Flex>
        {/* Divider */}
        <Button
          width={'100%'}
          height={'56px'}
          background={'#4A99E9'}
          textAlign={'center'}
          margin={'3px'}
          borderRadius={'8px'}
        >
          Place Order
        </Button>
      </div>
    </>
  )
}
