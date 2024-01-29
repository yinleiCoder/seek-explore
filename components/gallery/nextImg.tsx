import Image from 'next/image'
import type { RenderPhotoProps } from 'react-photo-album'

// react-photo-album 为了使用next/image，必须要包一层
export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, position: 'relative' }}>
      <Image
        fill
        src={photo}
        placeholder={'blurDataURL' in photo ? 'blur' : undefined}
        {...{ alt, title, sizes, className, onClick }}
        className="object-cover rounded-md hover:shadow-md hover:shadow-zinc-800/40 hover:-translate-y-2 duration-300"
      />
    </div>
  )
}
