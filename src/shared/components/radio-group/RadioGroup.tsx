import { ComponentPropsWithoutRef, ElementType, FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './RadioGroup.module.scss'

import { Typography } from '@/shared/components'

type Option = {
  label: string
  value: string
}
type Props = {
  defaultValue?: string
  disabled?: boolean
  onValueChange: (value: string) => void
  options: Option[]
  value: string
}
export const RadioGr: FC<Props> = ({ onValueChange, options, defaultValue, value, disabled }) => {
  return (
    <span className={s.radioContent}>
      <RadioGroup.Root
        className={s.root}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
      >
        {options.map(option => {
          return (
            <div className={s.container} key={option.value}>
              <div className={s.itemContainer}>
                <RadioGroup.Item className={s.item} key={option.label} value={option.value}>
                  <RadioGroup.Indicator className={s.indicator} />
                </RadioGroup.Item>
              </div>

              <Typography variant={'regular_text_14'} style={{ color: '#fff' }}>
                {option.label}
              </Typography>
            </div>
          )
        })}
      </RadioGroup.Root>
    </span>
  )
}
