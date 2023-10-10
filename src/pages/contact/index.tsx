import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Container from '~/components/Container'
import PortableTextBlock from '~/components/PortableTextBlock'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPage,PageContactData } from '~/lib/sanity.queries'

import { SharedPageProps } from '../_app'
import styles from './styles.module.css'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    pageData: PageContactData
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageData = await getPage(client, 'pageContact')

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pageData: pageData[0],
    },
  }
}

export default function ContactPage(
    { pageData }: InferGetStaticPropsType<typeof getStaticProps>,)  
    {
      const {title, body} = pageData
  return (
    <Container>
      <Head>
          <title>13milliseconds // Contact</title>
      </Head>
      <section className={styles.logos}>
        <h1>{title}</h1>
        <div className={styles.content}>
          <PortableTextBlock value={body} />
        </div>
      </section>
    </Container>
  )
}
