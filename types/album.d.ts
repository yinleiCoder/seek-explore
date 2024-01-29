interface AlbumSrcset {
  src: string
  width: number
  height: number
}

export interface Album {
  src: string
  width: number
  height: number
  alt?: string
  title?: string
  srcSet?: AlbumSrcset[]
}
