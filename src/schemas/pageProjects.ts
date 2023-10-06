import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageProjects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    })
  ]
})
