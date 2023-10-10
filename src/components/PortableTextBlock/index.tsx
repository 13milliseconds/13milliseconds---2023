import { PortableText, PortableTextReactComponents, PortableTextTypeComponent, PortableTextTypeComponentProps } from "@portabletext/react";
import { ImageAsset } from "sanity";

import { VideoAsset } from "~/lib/sanity.queries";

import ResponsiveImage from "../ResponsiveImage";
import Video from "../Video";

const myPortableTextComponents: PortableTextReactComponents = {
    types: {
        image: ({ value }: PortableTextTypeComponentProps<ImageAsset>) => <ResponsiveImage width={1000} image={value} alt='' className={""} />,
        video: ({ value }: PortableTextTypeComponentProps<VideoAsset>) => <Video videoAsset={value} />,
    },
    marks: undefined,
    block: undefined,
    list: undefined,
    listItem: undefined,
    hardBreak: false,
    unknownMark: undefined,
    unknownType: undefined,
    unknownBlockStyle: undefined,
    unknownList: undefined,
    unknownListItem: undefined
}

export default function PortableTextBlock({value}){
    return <PortableText 
                value={value} 
                components={myPortableTextComponents}
            />
}