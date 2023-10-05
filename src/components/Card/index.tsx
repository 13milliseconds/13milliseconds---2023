import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'

import styles from './styles.module.css'

export default function Card({ post }: { post: Post }) {
  return (
    <div className={styles.card}>
      {post.mainImage ? (
        <Image
          className={styles.card__cover}
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : null}
      <div className={styles.card__container}>
        <h3 className={styles.card__title}>
          <Link className={styles.card__link} href={`/project/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.card__excerpt}>{post.excerpt}</p>
      </div>
    </div>
  )
}
