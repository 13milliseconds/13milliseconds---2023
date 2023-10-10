import MuxPlayer from '@mux/mux-player-react'
import { useRef } from 'react';

import { VideoAsset } from '~/lib/sanity.queries';

import styles from './styles.module.css'

export default function Video({ videoAsset }: {
    videoAsset: VideoAsset
}){
    console.log(videoAsset)
    const videoEl = useRef(null);
    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch(error => {
          console.error("Error attempting to play", error);
        });
    };

    return <MuxPlayer
    streamType="on-demand"
    playbackId={videoAsset.playbackId}
    playsInline
    loop
    muted
    ref={videoEl}
    onCanPlay={attemptPlay}
    className={styles.videoplayer}
  />
    
}