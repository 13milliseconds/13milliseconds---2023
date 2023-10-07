import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
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
  return (
    <Container>
      <section className={styles.logos}>
        Contact
      </section>
    </Container>
  )
}
