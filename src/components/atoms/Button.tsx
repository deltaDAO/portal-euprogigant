import React, { ReactNode, FormEvent, ReactElement } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'
import styles from './Button.module.css'

const cx = classNames.bind(styles)

export interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: (e: FormEvent) => void
  disabled?: boolean
  to?: string
  name?: string
  size?: 'small'
  style?: 'primary' | 'ghost' | 'outline' | 'text'
  type?: 'submit'
  download?: boolean
  target?: string
  rel?: string
  title?: string
}

export default function Button({
  href,
  children,
  className,
  to,
  size,
  style,
  ...props
}: ButtonProps): ReactElement {
  const styleClasses = cx({
    button: true,
    primary: style === 'primary',
    ghost: style === 'ghost',
    outline: style === 'outline',
    text: style === 'text',
    small: size === 'small',
    [className]: className
  })

  return to ? (
    <Link to={to} className={styleClasses} {...props}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={styleClasses} {...props}>
      {children}
    </a>
  ) : (
    <button className={styleClasses} {...props}>
      {children}
    </button>
  )
}
