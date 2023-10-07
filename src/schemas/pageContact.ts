import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageContact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ]
})
