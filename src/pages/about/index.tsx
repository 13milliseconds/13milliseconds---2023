import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
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
        } = pageData
  return (
    <Container>
      <section className={styles.page__content}>
        <div>
            <PortableText value={body} />
        </div>
        <div>
          <p>A stupid image</p>
        </div>
      </section>
      <section className={styles.logos}>
        Clients logos
      </section>
    </Container>
  )
}
