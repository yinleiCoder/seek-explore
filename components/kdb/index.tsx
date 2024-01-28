import clsx from 'clsx'

function Kdb({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'text-sm bg-zinc-100 rounded px-[6px] dark:text-white dark:bg-zinc-600',
        className
      )}
    >
      {children}
    </span>
  )
}

export default Kdb
