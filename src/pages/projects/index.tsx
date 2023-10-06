import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPage,getPosts,PageProjectsData, type Post, postsQuery } from '~/lib/sanity.queries'

import { SharedPageProps } from '../_app'
import styles from './styles.module.css'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    postsLoaded: Post[]
    pageData: PageProjectsData
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageData = await getPage(client, 'pageProjects')
  const postsLoaded = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pageData: pageData[0],
      postsLoaded,
    },
  }
}


export default function ProjectsPage({ pageData, postsLoaded }: InferGetStaticPropsType<typeof getStaticProps>) {
  const {title} = pageData
  const [posts] = useLiveQuery<Post[]>(postsLoaded, postsQuery)

  return (
    <Container>
      <section className={styles.intro}>
       <h1>{ title }</h1>
      </section>
      <section  className={styles.allPosts}>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : null}
      </section>
    </Container>
  )
}
