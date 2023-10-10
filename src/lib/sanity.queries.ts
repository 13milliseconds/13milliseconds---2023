import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
  ...,
  "mainVideo": mainVideo.asset->{
    playbackId,

  }
} | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  "mainVideo": mainVideo.asset->{
    playbackId,
  },
  body[]{
    ...,
    _type == "video" => {
      "playbackId": asset->playbackId,
    }
  }
}`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
// export const videoByRefQuery = groq`*[_type == "mux.video" && slug.current == $slug][0]{
//   ...,
//   "mainVideo": mainVideo.asset->{
//     playbackId,
//   }
// }`

// export async function getVideo(
//   client: SanityClient,
//   ref: string,
// ): Promise<Post> {
//   return await client.fetch(videoByRefQuery, {
//     ref,
//   })
// }

// GET PAGE DATA
export async function getPage(client: SanityClient, page : string)
: Promise<PageAboutData | PageHomeData | PageProjectsData | PageContactData> {
  const pageQuery = groq`*[_id == "${page}"]{
    ...,
    featuredProjects[]->{
      ...,
      "mainVideo": mainVideo.asset->{
        playbackId,
      }
    },
  }`
  return await client.fetch(pageQuery)
}

// GET SITE SETTINGS
export async function getSiteSettings(client: SanityClient): Promise<SiteSettingsData> {
  const siteSettingsQuery = groq`*[_type == "siteSettings"]`
  return await client.fetch(siteSettingsQuery)
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  mainVideo?: {
    playbackId: string
  }
  body: PortableTextBlock[]
}

export interface PageAboutData {
  title?: string
  body: PortableTextBlock[]
  bioImage: ImageAsset
  clients: ImageAsset[]
}

export interface PageProjectsData {
  title?: string
}

export interface PageContactData {
  title?: string
}

export interface PageHomeData {
  title?: string
  intro: string
  featuredProjects: Post[]
}

export interface SiteSettingsData {
  title?: string
}

export interface  VideoAsset {
  playbackId: string
}