import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Input } from '@/shared/components'

type Props = {
  callback: (value: string) => void
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange'>

export const DebouncedInput = ({ callback, ...rest }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<null | string>(null)
  const [valueInput, setValueInput] = useState<string>('')

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue !== null) {
        callback(debouncedValue)
        setDebouncedValue(null)
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [debouncedValue, callback])

  const handleInputChange = (e: string) => {
    setValueInput(e)
    setDebouncedValue(e)
  }

  return (
    <Input
      {...rest}
      value={valueInput}
      onChangeValue={handleInputChange}
      placeholder="Search"
      type={'search'}
    />
  )
}
