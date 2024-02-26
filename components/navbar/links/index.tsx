'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import clsx from 'clsx'

function NavLinks({ links }: { links: NavbarItem[] }) {
  const pathname = usePathname()
  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(link.className, 'hover:text-primary', {
              'text-primary': pathname === link.href,
            })}
          >
            {link.name}
            {pathname === link.href && (
              <motion.div
                className="underline w-full h-[2px]  rounded-full bg-primary"
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
