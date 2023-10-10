import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import PortableTextBlock from '~/components/PortableTextBlock'
import ResponsiveImage from '~/components/ResponsiveImage'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

import styles from './styles.module.css'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <Head>
          <title>13milliseconds // {post.title}</title>
      </Head>
      <div className={styles.project}>
      <section className={styles.project__header}>
        <h1 className={styles.project__title}>{post.title}</h1>
        <p className={styles.project__excerpt}>{post.excerpt}</p>
      </section>
      <section className={styles.project__mainImage}>
        {post.mainImage ? (
        <ResponsiveImage
          image={post.mainImage}
          width={800}
          className={styles.project__cover}
          alt="project image"
          />
      ) : null}
      </section>
      <section className={styles.project__content}>
            <PortableTextBlock value={post.body} />
      </section>
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/projects/${slug}`) || [],
    fallback: 'blocking',
  }
}
