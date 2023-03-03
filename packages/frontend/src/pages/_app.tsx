import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { BaseLayout } from '@components/layout/BaseLayout'
import { HotToastConfig } from '@components/layout/HotToastConfig'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import '@rainbow-me/rainbowkit/styles.css'
import { env } from '@shared/environment'
import GlobalStyles from '@styles/GlobalStyles'
import { Web3Modal } from '@web3modal/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { mainnet, optimism, polygon } from 'wagmi/chains'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'

// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// 1. Get projectID at https://cloud.walletconnect.com
if (!env.projectId) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
const projectId = env.projectId

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism]

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
  provider,
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

function MyApp({ Component, pageProps }: AppProps) {
  console.log(wagmiClient.getProvider())
  return (
    <>
      {/* TODO SEO */}
      <DefaultSeo
        dangerouslySetAllPagesToNoFollow={!env.isProduction}
        dangerouslySetAllPagesToNoIndex={!env.isProduction}
        defaultTitle="bluebirdswap" // TODO
        titleTemplate="%s | bluebirdswap" // TODO
        description="EVM-based Smart Contract & DApp Development Boilerplate" // TODO
        openGraph={{
          type: 'website',
          locale: 'en',
          url: env.url,
          site_name: 'bluebirdswap', // TODO
          images: [
            {
              url: `${env.url}/images/cover.jpg`, // TODO
              width: 1200,
              height: 670,
            },
          ],
        }}
        twitter={{
          handle: '@scio_xyz', // TODO
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CacheProvider value={cache}>
        <ChakraProvider>
          <DarkMode>
            <GlobalStyles />
            {/* //TODO : WALLET CONNECT */}
            <WagmiConfig client={wagmiClient}>
              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>
            </WagmiConfig>
            <HotToastConfig />
          </DarkMode>
        </ChakraProvider>
      </CacheProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default MyApp
