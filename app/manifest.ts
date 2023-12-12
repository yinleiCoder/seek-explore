import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '寻寻觅觅',
    short_name: '寻寻觅觅',
    description: '行之力则知愈进，知之深则行愈达',
    start_url: '/',
    display: 'standalone',
    background_color: 'rgba(255,246,223,0.5)',
    theme_color: '#000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
