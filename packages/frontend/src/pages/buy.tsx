import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import type { NextPage } from 'next'
import 'twin.macro'
import { Exchange, optionsAddress } from '@components/exchange/Exchange'
import { useContractRead } from 'wagmi'
import optionABI from '../shared/abi/options.json'
import { BigNumber } from 'ethers'
import request, { gql } from 'graphql-request'
import { useEffect } from 'react'

const Buy: NextPage = () => {
  const { data: epoch } = useContractRead({
    address: optionsAddress,
    abi: optionABI,
    functionName: 'epoch',
    args: [],
  })

  const { data: puts } = useContractRead({
    address: optionsAddress,
    abi: optionABI,
    functionName: 'getStrikes',
    args: [epoch, true],
  })

  const { data: calls } = useContractRead({
    address: optionsAddress,
    abi: optionABI,
    functionName: 'getStrikes',
    args: [epoch, true],
  })

  const { data: startTimeEpoch } = useContractRead({
    address: optionsAddress,
    abi: optionABI,
    functionName: 'startTimeEpoch',
    args: [],
  })

  const { data: expiry } = useContractRead({
    address: optionsAddress,
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
        const response = await request(
          'https://api.studio.thegraph.com/query/43349/bluebird-swap-goerli/v0.0.7',
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
        console.log('AllOptions', response)
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
          strikePrices={[
            { price: 9, isPut: true },
            { price: 10, isPut: true },
            { price: 11, isPut: true },
            { price: 13, isPut: false },
            { price: 14, isPut: false },
            { price: 15, isPut: false },
          ]}
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
