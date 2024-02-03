import { IoLogoGithub } from 'react-icons/io'
import Button from '../button'

export default function Footer() {
  return (
    <footer className="flex justify-center items-center text-sm md:text-base py-2 dark:text-white text-gray-500 gap-2 border-t border-gray-300">
      <span>©&nbsp;{new Date().getFullYear()}&nbsp;尹磊&nbsp;网站由Nextjs14强力驱动</span>
      <a target="_blank" href="https://github.com/yinleiCoder" className="flex items-center">
        <Button
          icon={IoLogoGithub}
          className="hover:text-zinc-800 dark:hover:text-primary font-bold"
        >
          Github
        </Button>
      </a>
    </footer>
  )
}
