import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import {
  azukiOptionsAddress,
  Exchange,
  optionsAddress,
  StrikePrice,
} from '@components/exchange/Exchange'
import { useContractRead } from 'wagmi'
import optionABI from '../shared/abi/options.json'
import { BigNumber } from 'ethers'
import request, { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { env } from '@shared/environment'

const Buy: NextPage = () => {
  const [strikes, setStrikes] = useState<StrikePrice[]>([
    { id: '0', strikePrice: 0, isPut: true },
    { id: '0', strikePrice: 0, isPut: true },
    { id: '0', strikePrice: 0, isPut: true },
    { id: '0', strikePrice: 0, isPut: false },
    { id: '0', strikePrice: 0, isPut: false },
    { id: '0', strikePrice: 0, isPut: false },
  ])
  const { data: epoch } = useContractRead({
    address: azukiOptionsAddress,
    abi: optionABI,
    functionName: 'epoch',
    args: [],
  })

  const { data: puts } = useContractRead({
    address: azukiOptionsAddress,
    abi: optionABI,
    functionName: 'getStrikes',
    args: [epoch, true],
  })

  const { data: calls } = useContractRead({
    address: azukiOptionsAddress,
    abi: optionABI,
    functionName: 'getStrikes',
    args: [epoch, true],
  })

  const { data: startTimeEpoch } = useContractRead({
    address: azukiOptionsAddress,
    abi: optionABI,
    functionName: 'startTimeEpoch',
    args: [],
  })

  const { data: expiry } = useContractRead({
    address: azukiOptionsAddress,
    abi: optionABI,
    functionName: 'EXPIRY',
    args: [],
  })
  const endTime = startTimeEpoch
    ? (startTimeEpoch as BigNumber).add(expiry as BigNumber)
    : BigNumber.from('0')

  useEffect(() => {
    const getPriceHistory = async () => {
      try {
        const response: {
          options: { epoch: string; id: string; isPut: boolean; strikePrice: string }[]
        } = await request(
          env.graphEndPoint,
          gql`
            query AllOptions {
              options {
                id
                epoch
                strikePrice
                isPut
              }
            }
          `,
          {},
        )
        setStrikes(
          response.options
            .filter(
              (option) =>
                option.id.toLowerCase().includes(azukiOptionsAddress.toLowerCase()) &&
                option.epoch === (epoch as BigNumber).toString(),
            )
            .sort((a, b) =>
              +a.strikePrice > +b.strikePrice ? 1 : +b.strikePrice > +a.strikePrice ? -1 : 0,
            )
            .map((obj) => ({
              ...obj,
              strikePrice: +(+formatEther(BigNumber.from(obj.strikePrice)) * 1000000).toFixed(2),
            })),
        )
      } catch (error) {
        console.log(error)
      }
    }
    try {
      getPriceHistory()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar url="trade" />
      {/* <Image src="../landing.svg" width={10} height={10} /> */}

      <CenterBody tw="mt-20 mb-10 px-5">
        <Exchange
          strikePrices={strikes}
          collectionName="BlueBird Yacht Club"
          startDate={new Date(startTimeEpoch ? +startTimeEpoch?.toString() * 1000 : ' ')}
          endDate={new Date(endTime ? +endTime?.toString() * 1000 : ' ')}
        />
        {/* Title */}
      </CenterBody>
    </>
  )
}

export default Buy
