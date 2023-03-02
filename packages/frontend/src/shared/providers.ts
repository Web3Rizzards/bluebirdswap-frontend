import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [mainnet, polygon]

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: 'e83a061989116d32873819d49af1e902' }),
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: 'e83a061989116d32873819d49af1e902',
    version: '2',
    appName: 'web3Modal',
    chains,
  }),
  provider,
})

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, [polygon])
