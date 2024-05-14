import { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-duplicates
import { format, isValid } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru'
import Link from 'next/link'
import { DateRange } from 'react-day-picker'

import { Typography } from '..'
import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger, Calendar, CalendarButton } from '../ui'

import { CalendarDark, CalendarLight } from '@/shared/assets'

type Props = {
  mode: 'single' | 'range'
  errorMessage?: string
  errorLinkHref?: string
  errorLinkMessage?: string
  lang?: string
  setResultDate?: React.Dispatch<React.SetStateAction<Date | DateRange | undefined>>
  defaultMonth?: Date
  label?: string
  onBlur: (date?: Date | DateRange) => void
}

export function DatePicker({
  mode,
  errorMessage,
  errorLinkHref = '#',
  errorLinkMessage,
  setResultDate,
  lang,
  defaultMonth,
  label,
  onBlur,
  ...props
}: Props) {
  const [date, setDate] = useState<Date>()
  const [range, setRange] = useState<DateRange>()
  const baseDate = date || defaultMonth || new Date()
  const [dateValue, setDateValue] = useState('')
  const isSelected = date || range
  const locale = lang === 'ru' ? ru : undefined

  const handleDate = (date?: Date) => {
    if (date && date instanceof Date) {
      setDateValue(format(date, 'yyyy-MM-dd'))

      onBlur(date)
    }
  }

  useEffect(() => {
    if (range && range.to) {
      setResultDate && setResultDate(range)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  useEffect(() => {
    const date = new Date(dateValue)

    isValid(date) && setDate(date)
  }, [dateValue])

  useEffect(() => {
    !date && defaultMonth && setDateValue(format(defaultMonth, 'yyyy-MM-dd'))
  }, [date, defaultMonth])

  return (
    <div>
      <label className="text-sm text-light-900 leading-relaxed">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <CalendarButton
            onBlur={() => onBlur(date)}
            variant={'default'}
            className={cn(
              'min-w-[160px] w-full justify-between text-left font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 group',
              !isSelected && 'text-light-900',
              errorMessage &&
                'data-[state=closed]:border-danger-500 data-[state=closed]:text-danger-500 border-[1px]'
            )}
          >
            {/* {mode === 'single' && (
              <span className="md:hidden">
                {!isSelected && format(baseDate, 'dd/MM/yyyy')}
                {date && format(date, 'dd/MM/yyyy')}
              </span>
            )} */}
            {mode === 'single' && baseDate && (
              <input
                type="date"
                placeholder="yyyy-dd-mm"
                value={dateValue}
                min={'1910-01-01'}
                onChange={e => setDateValue(e.target.value)}
                className="bg-dark-500 border-dark-500 text-base outline-none flex-1 w-full"
              />
            )}
            {range?.from &&
              `${format(range.from, 'dd/MM/yyyy')} ${
                range.to ? '- ' + format(range.to, 'dd/MM/yyyy') : ''
              }`}
            <CalendarDark className="group-data-[state=closed]:hidden" />
            <CalendarLight className="group-data-[state=open]:hidden" />
          </CalendarButton>
        </PopoverTrigger>
        {errorMessage && (
          <Typography variant="small_text" className="text-danger-500 left-0">
            {errorMessage}
            {errorLinkMessage && (
              <Link className="underline" href={errorLinkHref}>
                {errorLinkMessage}
              </Link>
            )}
          </Typography>
        )}
        <PopoverContent className="w-auto p-0 dark">
          {mode === 'single' && (
            <Calendar
              mode={'single'}
              locale={locale}
              selected={date}
              onSelect={handleDate}
              initialFocus
              className="dark bg-dark-500 border-dark-300 hidden md:block"
              defaultMonth={date}
              {...props}
            />
          )}
          {mode === 'range' && (
            <Calendar
              mode={'range'}
              locale={locale}
              selected={range}
              onSelect={setRange}
              initialFocus
              className="dark bg-dark-500 border-dark-300"
              defaultMonth={defaultMonth}
              {...props}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
