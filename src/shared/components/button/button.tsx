import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  variant?: 'primary' | 'secondary' | 'outline' | 'link'
  fullWidth?: boolean
  as?: T
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} ${
        Component === 'a' ? s.asLink : ''
      }`}
      {...rest}
    >
      <span className={s.valueBox}>{rest.children}</span>
    </Component>
  )
}
