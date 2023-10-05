import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import pageAbout from './pageAbout'
import pageHome from './pageHome'
import pageWork from './pageWork'
import post from './post'
import siteSettings from './siteSettings'

export const schemaTypes = [
  post, 
  blockContent,
  pageHome,
  pageAbout,
  pageWork,
  siteSettings,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post, 
    blockContent,
    pageHome,
    pageAbout,
    pageWork,
    siteSettings,
  ],
}
