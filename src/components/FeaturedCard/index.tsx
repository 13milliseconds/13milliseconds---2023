import MuxPlayer from '@mux/mux-player-react'
import Link from 'next/link'
import { useRef } from 'react'

import { type Post } from '~/lib/sanity.queries'

import ResponsiveImage from '../ResponsiveImage'
import styles from './styles.module.css'

export default function FeaturedCard({ post }: { post: Post }) {
  const { mainVideo, mainImage } = post
  const videoEl = useRef(null);
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  return (
    <div className={styles.card}>
      {mainVideo ?
      <MuxPlayer
      streamType="on-demand"
      playbackId={mainVideo.playbackId}
      playsInline
      loop
      muted
      ref={videoEl}
      onCanPlay={attemptPlay}
      className={styles.card__videoplayer}
    />
       :null}
    {mainImage ? (
        <ResponsiveImage
          image={mainImage}
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
