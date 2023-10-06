import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import { ImageAsset } from 'sanity';

import { urlForImage } from '~/lib/sanity.image';

export default function ResponsiveImage({
    image,
    width,
    alt,
    className
}:{
    image: ImageAsset
    width: number
    alt: string
    className: string
}){
    const url = urlForImage(image).width(width).url()

    return <Image
                className={className}
                src={url}
                width={getImageDimensions(url).width}
                height={getImageDimensions(url).height}
                alt={alt}
                />
}