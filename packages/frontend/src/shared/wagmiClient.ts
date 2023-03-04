import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { allChains, chain, Chain, configureChains, createClient } from 'wagmi'
import { polygon, goerli } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './environment'

const baseGoerli = {
  id: 84531,
  network: 'base-goerli',
  name: 'Base Goerli',
  nativeCurrency: { name: 'Base Goerli', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: 'https://goerli.base.org',
    public: 'https://goerli.base.org',
  },
  blockExplorers: {
    etherscan: {
      name: 'Basescan',
      url: 'https://goerli.basescan.org',
    },
    default: {
      name: 'Basescan',
      url: 'https://goerli.basescan.org',
    },
  },
  testnet: true,
}

const scrollGoerli = {
  id: 534353,
  network: 'scroll-goerli',
  name: 'Scroll Goerli',
  nativeCurrency: { name: 'Scroll Goerli', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: 'https://alpha-rpc.scroll.io/l2',
    public: 'https://alpha-rpc.scroll.io/l2',
  },
  blockExplorers: {
    etherscan: {
      name: 'Scrollscan',
      url: 'https://blockscout.scroll.io',
    },
    default: {
      name: 'Scrollscan',
      url: 'https://blockscout.scroll.io',
    },
  },
  testnet: true,
}

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */

export const defaultChain: Chain | undefined = allChains.find(
  (chain) => env.defaultChain === chain.id,
)

export const isChainSupported = (chainId?: number): boolean => {
  return chainId && env.supportedChains.includes(chainId)
}
export const supportedChains: Chain[] = allChains.filter((chain) => isChainSupported(chain.id))

export const getRpcUrl = (chainId: number): string => {
  return env.rpcUrls[chainId as keyof typeof env.rpcUrls]
}

export const { chains, provider } = configureChains(
  [goerli, baseGoerli, scrollGoerli],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'bluebirdswap',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
