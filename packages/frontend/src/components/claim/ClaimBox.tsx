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
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC, useState } from 'react'
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

export const ClaimBox: FC = () => {
  const [selectHistory, setSelectHistory] = useState<HistoryProps>()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
  return (
    <>
      <VStack width="-webkit-fill-available">
        <Text fontSize="x-large" fontWeight={600}>
          History
        </Text>
        {historyList.map((history) => (
          <VStack
            key={history?.id}
            gap={2}
            background="#1e2c37"
            margin="18px"
            padding="16px 41px"
            borderRadius="15px"
            width="80%"
            onClick={() => handleSelectHistory(history)}
          >
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
            <Flex justifyContent="space-between" fontSize="large">
              <Text>Strategy</Text>
              <Text>{selectHistory?.stretegy}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontSize="large">
              <Text>Amount</Text>
              <Text>{selectHistory?.amount}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontSize="large">
              <Text>Premium Paid</Text>
              <Text>{selectHistory?.premium}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontSize="large">
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
