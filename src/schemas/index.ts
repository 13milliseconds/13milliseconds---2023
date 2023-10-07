import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import pageAbout from './pageAbout'
import pageContact from './pageContact'
import pageHome from './pageHome'
import pageProjects from './pageProjects'
import post from './post'
import siteSettings from './siteSettings'

export const schemaTypes = [
  post, 
  blockContent,
  pageHome,
  pageAbout,
  pageProjects,
  siteSettings,
  pageContact,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post, 
    blockContent,
    pageHome,
    pageAbout,
    pageProjects,
    siteSettings,
    pageContact,
  ],
}
