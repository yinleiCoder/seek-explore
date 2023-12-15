import { IoLogoGithub } from 'react-icons/io'

export default function Footer() {
  return (
    <footer className="flex justify-center items-center text-sm md:text-base py-2 dark:text-white text-gray-700 gap-2 border-t">
      <span>©&nbsp;{new Date().getFullYear()}&nbsp;尹磊&nbsp;网站由Nextjs14强力驱动</span>
      <a
        target="_blank"
        href="https://github.com/yinleiCoder"
        className="flex items-center gap-1 font-bold hover:text-black dark:hover:text-gray-400 duration-300"
      >
        <IoLogoGithub />
        <span>Github</span>
        <svg
          width="0.95em"
          height="0.95em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          data-immersive-translate-effect="1"
          data-immersive_translate_walked="a49b7234-c1c2-4eba-8562-a11b038e6505"
        >
          <path
            d="M20 13.5001C20 14.8946 20 15.5919 19.8618 16.1673C19.4229 17.9956 17.9955 19.423 16.1672 19.8619C15.5918 20.0001 14.8945 20.0001 13.5 20.0001H12C9.19974 20.0001 7.79961 20.0001 6.73005 19.4551C5.78924 18.9758 5.02433 18.2109 4.54497 17.2701C4 16.2005 4 14.8004 4 12.0001V11.5001C4 9.17035 4 8.0055 4.3806 7.08664C4.88807 5.8615 5.86144 4.88813 7.08658 4.38066C7.86344 4.05888 8.81614 4.00915 10.5 4.00146M19.7597 9.45455C20.0221 7.8217 20.0697 6.16984 19.9019 4.54138C19.8898 4.42328 19.838 4.31854 19.7597 4.24027M19.7597 4.24027C19.6815 4.16201 19.5767 4.11023 19.4586 4.09806C17.8302 3.93025 16.1783 3.97792 14.5455 4.24027M19.7597 4.24027L10 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-immersive-translate-effect="1"
            data-immersive_translate_walked="a49b7234-c1c2-4eba-8562-a11b038e6505"
          ></path>
        </svg>
      </a>
    </footer>
  )
}
