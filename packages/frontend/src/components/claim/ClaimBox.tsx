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
import { azukiFractionalizeAddress } from '@components/exchange/Exchange'
import { env } from '@shared/environment'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'
import { request, gql } from 'graphql-request'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import { useAccount } from 'wagmi'

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
  name: string
  image: string
  id: string
  option: {
    id: string
    epoch: string
    strikePrice: number
    isPut: boolean
    startTime: string
    expiry: string
  }
  premium: string
  size: string
  exercised: boolean
  isProfit: boolean
  pl: string
  pnl: string
  timestamp: string
}

export const ClaimBox: FC = () => {
  const [selectHistory, setSelectHistory] = useState<TradeType>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<TradeType[]>([])
  const { address } = useAccount()

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
        trades: TradeType[]
      } = await request(
        env.graphEndPoint,
        gql`
          query OwnerTrades($owner: Bytes!) {
            trades(where: { owner: $owner }) {
              id
              owner
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
        { owner: address },
      )
      setData(
        response.trades.map((trade) => ({
          id: trade.id,
          name:
            (trade.option.id.toLowerCase().includes(azukiFractionalizeAddress) ? 'Azuki' : 'BBYC') +
            'Option',
          image: 'https://picsum.photos/200/200',
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
          pnl: (
            (+'12289403943000' - +trade.premium) * +trade.size -
            +trade.size * +trade.premium
          ).toString(),
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
        {data.map((history) => (
          <VStack key={history?.id} style={CardStyle} onClick={() => handleSelectHistory(history)}>
            <Text fontSize="large" fontWeight={400}>
              {history.name}
            </Text>
            <HStack width="100%" justifyContent="space-between">
              <Image src={history.image} width={100} height={100} alt="pic" />
              <Flex>
                <Text>P&L:</Text>

                {+history?.pnl > 0 ? (
                  <Text color="lightgreen">
                    +{+(+formatEther(BigNumber.from(history.pnl))).toFixed(5)}
                    {history.option.isPut ? 'ETH' : 'NFT'}
                  </Text>
                ) : (
                  <Text color="lightpink">
                    {+(+formatEther(BigNumber.from(history.pnl))).toFixed(5)}
                    {history.option.isPut ? 'ETH' : 'NFT'}
                  </Text>
                )}
              </Flex>
              <VStack>
                <Flex>
                  <Text>Lock Price : </Text>
                  <Text>
                    {+(+formatEther(BigNumber.from(history.premium)) * 1000000).toFixed(2)} ETH
                  </Text>
                </Flex>
                <Flex>
                  <Text>Strike Price : </Text>
                  <Text>
                    {
                      +(
                        +formatEther(BigNumber.from(history?.option.strikePrice)) * 1000000
                      ).toFixed(2)
                    }{' '}
                    ETH
                  </Text>
                </Flex>
                {/* <Flex>
                  <Text>Expiry Price : </Text>
                  <Text>{history.expiryPrice} ETH</Text>
                </Flex> */}
              </VStack>
              <Text>{history.option.isPut ? 'PUT' : 'CALL'}</Text>
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
            <Flex style={FlexStyle}>
              <Text>Epoch</Text>
              <Text>{selectHistory?.option.epoch}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>Strategy</Text>
              <Text>{selectHistory?.option.isPut ? 'PUT' : 'CALL'}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>Amount</Text>
              <Text>{selectHistory?.size}</Text>
            </Flex>
            <Flex style={FlexStyle}>
              <Text>Premium Paid</Text>
              {/* (+trade.size * +trade.premium)).toString() */}
              {selectHistory && (
                <Text>
                  {formatEther(
                    BigNumber.from((+selectHistory.premium * +selectHistory.size).toString()),
                  )}{' '}
                  ETH
                </Text>
              )}
            </Flex>
            <Flex style={FlexStyle}>
              <Text>P&L</Text>

              {selectHistory &&
                (selectHistory?.pnl && +selectHistory?.pnl > 0 ? (
                  <Text color="lightgreen">
                    +{selectHistory?.pnl}
                    {selectHistory?.option.isPut ? ' ETH' : ' NFT'}
                  </Text>
                ) : (
                  <Text color="lightpink">
                    {+(+formatEther(BigNumber.from(selectHistory?.pnl))).toFixed(2)}
                    {selectHistory?.option.isPut ? ' ETH' : ' NFT'}
                  </Text>
                ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={!!(selectHistory?.pnl && +selectHistory?.pnl < 0)}
              width="100%"
              colorScheme="blue"
              mr={3}
              onClick={onhandleClaim}
            >
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
