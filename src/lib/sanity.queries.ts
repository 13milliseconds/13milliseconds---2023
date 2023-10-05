import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

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

// GET PAGE DATA
export async function getPage(client: SanityClient, page : string)
: Promise<PageAboutData | PageHomeData | PageWorkData> {
  const pageQuery = groq`*[_id == "${page}"]`
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
  body: PortableTextBlock[]
}

export interface PageAboutData {
  title?: string
  body: PortableTextBlock[]
}

export interface PageWorkData {
  title?: string
}

export interface PageHomeData {
  title?: string
}

export interface SiteSettingsData {
  title?: string
}
