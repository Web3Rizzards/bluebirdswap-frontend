import 'nprogress/nprogress.css'

import tw, { GlobalStyles as BaseStyles, css } from 'twin.macro'

import { Global } from '@emotion/react'

const customStyles = css`
  html {
    ${tw`scroll-smooth antialiased`}
  }
  body {
    ${tw`bg-slate-800 text-white`}
    ${tw`relative h-screen min-h-screen`}
  }

  #__next,
  #__next > div {
    ${tw`relative flex h-full min-h-full flex-col`}
  }

  /* Progress Bar */
  #nprogress > .bar {
    ${tw`bg-white`}
  }
  #nprogress > .spinner {
    ${tw`hidden!`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
