import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from "next/link"
import { useLiveQuery } from 'next-sanity/preview'
import { useState } from "react"

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

import styles from './styles.module.css'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const { scrollY} = useScroll();
  const [transitionPercent, setTransitionPercent] = useState(0)
  const transitionThreshold = 100

  useMotionValueEvent(scrollY, "change", (latest) => {
    setTransitionPercent(latest * 100 / transitionThreshold)
  })
  
  return (
    <Container>
      <motion.div className={styles.header__title} style={{ translateY: -transitionPercent }} >
          13milliseconds
        </motion.div>
      <section className={styles.intro}>
        We’re a digital-first creative studio turning brands into delightful web experiences. Our work is purpose-driven and we aim to work with social impact organizations and brands to reimagine and amplify their message.
      </section>

      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : null}
      </section>
    </Container>
  )
}
