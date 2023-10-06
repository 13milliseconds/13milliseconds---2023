import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState } from "react"

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPage, PageHomeData} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

import styles from './styles.module.css'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    pageData: PageHomeData
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageData = await getPage(client, 'pageHome')

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pageData: pageData[0],
    },
  }
}

export default function IndexPage(
  {pageData}: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {title, featuredProjects, intro} = pageData
  const { scrollY } = useScroll();
  const [transitionPercent, setTransitionPercent] = useState(0)
  const transitionThreshold = 300

  useMotionValueEvent(scrollY, "change", (latest) => {
    setTransitionPercent(latest * 100 / transitionThreshold)
  })
  
  return (
    <Container>
      <motion.div 
        className={styles.header__title} 
        style={{ 
          translateY: -transitionPercent,
          filter: `blur(${transitionPercent * .1}px)`,
          opacity: 1 - transitionPercent / 100,
        }} 
      >
          {title}
        </motion.div>
      <section className={styles.intro}>
        {intro}
      </section>

      <section>
        {featuredProjects.length ? (
          featuredProjects.map((post) => <Card key={post._id} post={post} />)
        ) : null}
      </section>
    </Container>
  )
}
