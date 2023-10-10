import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Container from '~/components/Container'
import ResponsiveImage from '~/components/ResponsiveImage'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPage,PageAboutData } from '~/lib/sanity.queries'

import { SharedPageProps } from '../_app'
import styles from './styles.module.css'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    pageData: PageAboutData
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageData = await getPage(client, 'pageAbout')

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pageData: pageData[0],
    },
  }
}

export default function AboutPage(
    { pageData }: InferGetStaticPropsType<typeof getStaticProps>,)  
    {
        const {
            title, 
            body,
            bioImage,
            clients,
        } = pageData
  return (
    <Container>
      <Head>
          <title>13milliseconds // About</title>
      </Head>
      <section className={styles.page__content}>
        <div>
            <PortableText value={body} />
        </div>
        {bioImage && 
        <div className={styles.bio__image}>
          <ResponsiveImage image={bioImage} width={500} alt={'Bio Image'} className={''} />
        </div>
      }
      </section>
      <section className={styles.logos}>
        {clients.length ? clients.map(client=> 
          <ResponsiveImage key={client._id} image={client} width={250} alt={''} className={''} />
        ) : null}
      </section>
    </Container>
  )
}
