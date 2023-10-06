import Link from 'next/link'

import { type Post } from '~/lib/sanity.queries'

import ResponsiveImage from '../ResponsiveImage'
import styles from './styles.module.css'

export default function Card({ post }: { post: Post }) {
  return (
    <div className={styles.card}>
      {post.mainImage ? (
        <ResponsiveImage
          image={post.mainImage}
          width={1200}
          className={styles.card__cover}
          alt="project image"
          />
      ) : null}
      <div className={styles.card__container}>
        <h3 className={styles.card__title}>
          <Link className={styles.card__link} href={`/projects/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.card__excerpt}>{post.excerpt}</p>
      </div>
    </div>
  )
}
