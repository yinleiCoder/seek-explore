'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

function NavLinks({ links }: { links: LinkProp[] }) {
  const pathname = usePathname()

  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(link.className, 'hover:text-indigo-400', {
              'text-indigo-500': pathname === link.href,
            })}
          >
            {link.name}
            {pathname === link.href && (
              <motion.div
                className="underline w-1 h-1 relative left-[50%] -translate-x-[50%] rounded-full bg-indigo-500"
                layoutId="underline"
              />
            )}
          </Link>
        )
      })}
    </>
  )
}

export default NavLinks
