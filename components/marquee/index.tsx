import ReactMarquee from 'react-fast-marquee'

// 跑马灯
export default function Marquee({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <ReactMarquee className={className} autoFill pauseOnHover>
      {children}
    </ReactMarquee>
  )
}
