import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHome',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        defineArrayMember({
          name: "project",
          type: 'reference',
          to: [{type: 'post'}]
        })
      ]
    }),
  ]
})
