import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { request, gql } from 'graphql-request'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'

export interface HistoryProps {
  name: string
  image: string
  id: number
  lockPrice: number
  strikePrice: number
  expiryPrice: number
  pnl: number
  pnlPositive: boolean
  unit: string
  stretegy: string
  amount: number
  premium: number
  startDate: string
  endDate: string
}

type TradeType = {
  id: number
  option: {
    id: number
    epoch: number
    strikePrice: number
    isPut: boolean
    startTime: number
    expiry: number
  }
  premium: number
  size: number
  exercised: number
  isProfit: boolean
  pl: number
  timestamp: number
}

export const ClaimBox: FC = () => {
  const [selectHistory, setSelectHistory] = useState<HistoryProps>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<TradeType[]>([])
  const historyList = [
    {
      name: 'Blue Bird Yatch Club Pool #1',
      image: 'https://picsum.photos/200/200',
      id: 1,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: true,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
    {
      name: 'Blue Bird Yatch Club Pool #2',
      image: 'https://picsum.photos/200/200',
      id: 2,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: true,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
    {
      name: 'Blue Bird Yatch Club Pool #3',
      image: 'https://picsum.photos/200/200',
      id: 3,
      lockPrice: 10,
      strikePrice: 11,
      expiryPrice: 12,
      pnl: 100000,
      pnlPositive: false,
      unit: 'bbBAYC',
      stretegy: 'call',
      amount: 1000,
      premium: 1000,
      startDate: '2023-02-27',
      endDate: '2023-03-06',
    },
  ]
  const handleSelectHistory = (history: any) => {
    console.log(history)
    setSelectHistory(history)
    onOpen()
  }

  const onhandleClaim = () => {
    console.log('claim')
  }

  useEffect(() => {
    const getHistory = async () => {
      const response: {
        ownerTrades: TradeType[]
      } = await request(
        'https://api.studio.thegraph.com/query/43349/chainlink-nft-floor-price/v0.0.2',
        gql`
          query OwnerTrades($owner: Bytes!) {
            trades(filter: { owner: { eq: $owner } }) {
              id
              option {
                id
                epoch
                strikePrice
                isPut
                startTime
                expiry
              }
              premium
              size
              exercised
              isProfit
              pl
              timestamp
            }
          }
        `,
        {},
      )
      setData(
        response.ownerTrades.map((trade) => ({
          id: trade.id,
          option: {
            id: trade.option.id,
            epoch: trade.option.epoch,
            strikePrice: trade.option.strikePrice,
            isPut: trade.option.isPut,
            startTime: trade.option.startTime,
            expiry: trade.option.expiry,
          },
          premium: trade.premium,
          size: trade.size,
          exercised: trade.exercised,
          isProfit: trade.isProfit,
          pl: trade.pl,
          timestamp: trade.timestamp,
        })),
      )
    }
    try {
      getHistory()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const CardStyle = {
    background: '#1e2c37',
    margin: '18px',
    padding: '16px 41px',
    borderRadius: '15px',
    width: '80%',
    gap: 2,
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  }

  const FlexStyle = {
    justifyContent: 'space-between',
    fontSize: 'large',
  }

  return (
    <>
      <VStack width="-webkit-fill-available">
        <Text fontSize="x-large" fontWeight={600}>
          History
        </Text>
        {historyList.map((history) => (
          <VStack key={history?.id} style={CardStyle} onClick={() => handleSelectHistory(history)}>
            <Text fontSize="large" fontWeight={400}>
              {history.name}
            </Text>
            <HStack width="100%" justifyContent="space-between">
              <Image src={history.image} width={100} height={100} alt="pic" />
              <Flex>
                <Text>P&L:</Text>

                {history?.pnlPositive ? (
                  <Text color="lightgreen">
                    +{history.pnl}
                    {history.unit}
                  </Text>
                ) : (
                  <Text color="lightpink">
                    -{history.pnl}
                    {history.unit}
                  </Text>
                )}
              </Flex>
              <VStack>
                <Flex>
                  <Text>Lock Price : </Text>
                  <Text>{history.lockPrice} ETH</Text>
                </Flex>
                <Flex>
                  <Text>Strike Price : </Text>
                  <Text>{history?.strikePrice} ETH</Text>
                </Flex>
                <Flex>
                  <Text>Expiry Price : </Text>
                  <Text>{history.expiryPrice} ETH</Text>
                </Flex>
              </VStack>
              <Text>{history.stretegy}</Text>
            </HStack>
          </VStack>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top="19%" height="50%">
          <ModalHeader>{selectHistory?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" justifyContent="center" gap="5px">
            <Text fontSize="large">
              {selectHistory?.startDate} to {selectHistory?.endDate}
            </Text>
            <Flex style={FlexStyle}>
              <Text>Strategy</Text>
              <Text>{selectHistory?.stretegy}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>Amount</Text>
              <Text>{selectHistory?.amount}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>Premium Paid</Text>
              <Text>{selectHistory?.premium}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>P&L</Text>

              {selectHistory?.pnlPositive ? (
                <Text color="lightgreen">
                  +{selectHistory?.pnl}
                  {selectHistory?.unit}
                </Text>
              ) : (
                <Text color="lightpink">
                  -{selectHistory?.pnl}
                  {selectHistory?.unit}
                </Text>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button width="100%" colorScheme="blue" mr={3} onClick={onhandleClaim}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
