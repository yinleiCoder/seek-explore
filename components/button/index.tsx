import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { IconType } from 'react-icons'

type ButtonProps = {
  icon?: IconType
  className?: string
  iconClassName?: string
  variant?: 'default' | 'outline' | 'text'
} & ComponentPropsWithoutRef<'button'>

// 带有react-icons图标的按钮
export default function Button({
  className = '',
  iconClassName = 'text-lg',
  icon: Icon,
  variant = 'default',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded inline-flex items-center',
        {
          '': variant === 'default',
          'border shadow': variant === 'outline',
          'border text-base': variant === 'text',
        },
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={clsx(
            {
              'mr-1': children,
            },
            iconClassName
          )}
        />
      )}
      {children}
    </button>
  )
}
