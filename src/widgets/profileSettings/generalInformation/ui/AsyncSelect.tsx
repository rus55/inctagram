import { useCallback, useEffect, useState } from 'react'

import { AsyncPaginate } from 'react-select-async-paginate'

export type OptionType = {
  value: string
  label: string
}

type AdditionalType = { page: number } | undefined

type Props = { cities: OptionType[]; onValueChange: (value: string) => void }

const customStyles = {
  //@ts-ignore
  container: provided => ({
    ...provided,
    width: '100%',
  }),
  //@ts-ignore
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    color: 'var(--color-light-100)',
    marginBottom: '-4px',
    padding: '0px',
    borderRadius: 'none',
    border: state.isFocused ? '1px solid c' : '1px solid var(--color-dark-100)',
    background: 'none',
    '&:hover': { background: 'var(--dark-500, #333)' },
  }),
  //@ts-ignore
  input: (provided, state) => ({
    ...provided,
    padding: '0px',
    margin: '0px',
    color: state.isFocused ? 'var(--color-accent-500)' : 'var(--color-light-100)',
  }),
  //@ts-ignore
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--color-dark-900)',
  }),
  //@ts-ignore
  menuItem: (provided, state) => ({
    ...provided,
    '&:hover': { color: 'var(--color-accent-500)' },
  }),
  //@ts-ignore
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--color-dark-500)' : 'var(--color-dark-900)',
    color: state.isFocused ? 'var(--color-accent-500)' : 'var(--color-light-100)',
    '&:hover': { color: 'var(--color-accent-500)' },
  }),
  //@ts-ignore
  indicatorSeparator: (provided, state) => ({
    display: 'none',
  }),
}

const optionsPerPage = 10

const defaultAdditional: AdditionalType = {
  page: 1,
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })

export function AsyncSelect({ cities, onValueChange }: Props) {
  const [value, onChange] = useState<OptionType | null>(null)

  useEffect(() => {
    value && onValueChange(value.label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    onChange(null)
  }, [cities])

  const loadOptions = useCallback(
    async (search: string, page?: number) => {
      await sleep(1000)

      let filteredOptions: OptionType[]

      if (!search) {
        filteredOptions = cities
      } else {
        const searchLower = search.toLowerCase()

        filteredOptions = cities.filter(({ label }) => label.toLowerCase().includes(searchLower))
      }
      page = page || 1
      const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page
      const slicedOptions = filteredOptions.slice(
        (page - 1) * optionsPerPage,
        page * optionsPerPage
      )

      return {
        options: slicedOptions,
        hasMore,
      }
    },
    [cities]
  )
  const loadPageOptions = useCallback(
    async (q: string, prevOptions: unknown, additional: AdditionalType) => {
      const page = additional?.page
      const { options, hasMore } = await loadOptions(q, page)

      return {
        options,
        hasMore,

        additional: {
          page: page ? page + 1 : 1,
        },
      }
    },
    [loadOptions]
  )

  return (
    <AsyncPaginate
      additional={defaultAdditional}
      value={value}
      loadOptions={loadPageOptions}
      onChange={onChange}
      cacheUniqs={[cities[0]?.value]}
      styles={customStyles}
    />
  )
}
