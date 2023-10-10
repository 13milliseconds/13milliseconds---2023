import MuxPlayer from '@mux/mux-player-react'
import { useEffect, useRef, useState } from 'react';

import { VideoAsset } from '~/lib/sanity.queries';

import styles from './styles.module.css'

export default function Video({ videoAsset }: {
    videoAsset: VideoAsset
}){
    const videoEl = useRef(null);

    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().then(() => {
            console.log('Playing')
        }).catch(error => {
            console.error("Error attempting to play", error);
            setTimeout(() => attemptPlay() , 500)
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