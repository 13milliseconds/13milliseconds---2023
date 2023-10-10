import '~/styles/global.css'

import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'
import Script from 'next/script'
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
      ) : (<>
        <Head>
          <title>13milliseconds</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Script id="google-analytics">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TSM69BH3');
          `}
        </Script>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSM69BH3"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <Component {...pageProps} />
        </>
      )}
    </>
  )
}
