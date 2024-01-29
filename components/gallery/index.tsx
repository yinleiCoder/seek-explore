'use client'

import PhotoAlbum from 'react-photo-album'
import NextJsImage from './nextImg'
import { photos } from './data'

export default function PhotoGallery() {
  return (
    <PhotoAlbum
      photos={photos}
      layout="masonry"
      renderPhoto={NextJsImage}
      defaultContainerWidth={1920}
      onClick={({ index, photo, event }) => console.log(index, photo)}
    />
  )
}
