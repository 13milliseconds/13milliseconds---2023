import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHome',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    })
  ]
})
