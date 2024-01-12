import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// sanity cms
export const client = createClient({
  projectId: 'w5myqwg6',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: false,
})

// convert image to url by sanity
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
