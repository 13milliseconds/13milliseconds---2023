import '~/styles/global.css'

import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { lazy } from 'react'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const myFont = localFont({ src: [
  {
    path: './fonts/PPNeueMontreal-Light.woff2',
    weight: '400',
    style: 'normal',
  },
  {
    path: './fonts/PPNeueMontreal-Regular.woff2',
    weight: '500',
    style: 'normal',
  },
]})

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${myFont.style.fontFamily};
          }
        `}
      </style>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
