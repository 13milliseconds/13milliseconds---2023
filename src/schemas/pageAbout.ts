import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageAbout',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'bioImage',
      title: 'Bio Image',
      type: 'image'
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [defineArrayMember({
        name: 'client',
        type: 'image',
      })]
    }),
  ]
})
