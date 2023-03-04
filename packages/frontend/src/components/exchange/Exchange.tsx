import { Box, Button, Flex, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { request, gql } from 'graphql-request'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { fetchBalance } from '@wagmi/core'
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
import { formatEther, id, parseEther } from 'ethers/lib/utils.js'
import { BigNumber } from 'ethers'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import optionABI from '../../shared/abi/options.json'

type StrikePrice = {
  isPut: boolean
  price: number
}
type ExchangeProps = {
  collectionName: string
  startDate: Date
  endDate: Date
  strikePrices: StrikePrice[]
}

type PriceResponse = {
  answer: string
  roundId: string
  timestamp: string
}

export const nftAddress = '0xd12C158F9CFf1a252B463F2c419Dca1f92872356'
export const fractionalizeAddress = '0xf12b904c594f5abebb9aed7a8b70b3a00d4f17cb'
export const grinderAddress = '0x6b3e522eD05AD29d8C52f091dBC5A7f9Eec97D4e'
export const optionsAddress = '0x71231BBda865651A86699D53FEF1A39B60bF0bf8'
export const azukiOptionsAddress = '0x548b1d4a67559bF801f35B57a8c0592826a4F56A'
export const azukiAddress = '0xe88fc6063b09d822b12fcab33f77e5ab6336e1c0'
export const azukiFractionalizeAddress = '0x39adf5f19c2da8e4554c6fd55f5d89d7273c6d4e'

export const Exchange: FC<ExchangeProps> = ({
  collectionName,
  startDate,
  endDate,
  strikePrices,
}) => {
  const { address } = useAccount()
  const [id, setID] = useState(0)
  const {
    data: nftBalance,
    isError,
    isLoading,
  } = useBalance({
    address: address ?? '0x',
    token: fractionalizeAddress,
  })
  const {
    data: ethBalance,
    isError: ethError,
    isLoading: ethIsLoading,
  } = useBalance({
    address: address ?? '0x',
  })
  // getPremium
  const { data: price } = useContractRead({
    address: optionsAddress,
    abi: optionABI,
    functionName: 'getPremium',
    args: [id],
  })
  const [data2, setData] = useState<PriceResponse[]>([])
  const [type, setType] = useState('Call')
  const [profit, setProfit] = useState(7.3)
  const [loss, setLoss] = useState(7)
  const [cost, setCost] = useState(0)
  const renderOptions = (strike: StrikePrice) => {
    return (
      <Box
        cursor={'pointer'}
        width={'132px'}
        height={'32px'}
        background={strike.isPut ? '#E93E4E' : '#5B9C4B'}
        margin={'3px'}
        borderRadius={'10px'}
        onClick={() => setType(strike.isPut ? 'Put' : 'Call')}
      >
        {' '}
        <Text fontWeight={'700'} margin={'inherit'} textAlign={'center'}>
          {strike.price + ' ETH'}
        </Text>{' '}
      </Box>
    )
  }

  useEffect(() => {
    const getPriceHistory = async () => {
      const response: {
        priceDatas: PriceResponse[]
      } = await request(
        'https://api.studio.thegraph.com/query/43349/chainlink-nft-floor-price/v0.0.2',
        gql`
          query LatestPriceData {
            priceDatas(orderBy: roundId, orderDirection: desc, first: 168) {
              roundId
              answer
              timestamp
            }
          }
        `,
        {},
      )
      setData(
        response.priceDatas.map((price) => ({
          timestamp: price.timestamp,
          answer: (Math.round(+formatEther(BigNumber.from(price.answer)) * 100) / 100).toFixed(2),
          roundId: price.roundId,
        })),
      )
    }
    try {
      getPriceHistory()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onChange = (event: any) => {
    console.log(event.target.value)
  }

  return (
    <Flex>
      <Box margin={'10px'}>
        <Text fontWeight={'700'} fontSize={'42px'}>
          {collectionName + ' ' + startDate.toLocaleString()}
        </Text>
        <Text fontWeight={'700'} fontSize={'24px'}>
          Expires {endDate.toLocaleString()}
        </Text>

        <LineChart
          width={950}
          height={500}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tickFormatter={(value) => {
              return new Date(+value * 1000).toLocaleTimeString()
            }}
            dataKey="timestamp"
          />
          <YAxis
            // domain={['dataMin, dataMax']}
            domain={([dataMin, dataMax]) => {
              return [dataMin * 0.97, dataMin * 1.03]
            }}
          />
          {/* /> */}
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="answer"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          {strikePrices.map((price, i) => {
            return (
              <ReferenceLine
                label={{ position: 'right', value: price.price + ' ETH', fontSize: 14 }}
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
      </Box>
      <Box margin={'10px'}>
        <Text fontWeight={'700'} fontSize={'40px'}>
          Current Floor Price
        </Text>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'56px'}
          background={'#FFFFFF'}
          margin={'3px'}
          borderRadius={'20px'}
        >
          {' '}
          <Text
            fontWeight={'700'}
            fontSize={'20px'}
            color={'#000000'}
            margin={'inherit'}
            textAlign={'center'}
          >
            {data2[data2.length - 1] && data2[data2.length - 1].answer
              ? data2[data2.length - 1].answer
              : '--'}
          </Text>{' '}
        </Box>
        <Flex justifyContent={'space-between'}>
          <Box fontWeight={'700'} width={'50%'} margin={'3px'} padding={3}>
            {' '}
            Put{' '}
          </Box>
          <Box fontWeight={'700'} width={'50%'} margin={'3px'} padding={3}>
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
          <Text fontWeight={'700'} fontSize={'30px'}>
            buying {type.toLowerCase()}
          </Text>
        </Flex>
        <Input
          onChange={onChange}
          height={'56px'}
          background={'#FFFFFF'}
          color={'black'}
          textAlign={'center'}
          margin={'3px'}
          borderRadius={'20px'}
        ></Input>

        <Box
          margin={'15px 0'}
          padding={'25px 0'}
          borderTop={'1px solid #344452'}
          borderBottom={'1px solid #344452'}
        >
          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'700'}>Strategy</Text>
            <Text fontWeight={'700'}>{type}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'700'}>Profit Zone</Text>
            <Text fontWeight={'700'}>{(type === 'Call' ? '> ' : '< ') + profit.toString()}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'700'}>Max Loss Zone</Text>
            <Text fontWeight={'700'}>{(type === 'Call' ? '< ' : '> ') + loss.toString()}</Text>
          </Flex>
        </Box>

        <Flex justifyContent={'space-between'}>
          <Text fontWeight={'700'}>Total Cost</Text>
          <Text fontWeight={'700'}>
            {cost} {type === 'Call' ? ' fBBYC' : ' ETH'}
          </Text>
        </Flex>

        <Flex justifyContent={'space-between'}>
          <Text fontWeight={'700'}>Your Balance</Text>
          <Text fontWeight={'700'}>
            {type === 'Call'
              ? formatEther(nftBalance?.value ? nftBalance?.value : BigNumber.from(0)) + ' fBBYC'
              : formatEther(ethBalance?.value ? ethBalance?.value : BigNumber.from(0)) + ' ETH'}
          </Text>
        </Flex>

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
      </Box>
    </Flex>
  )
}
