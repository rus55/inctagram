import { FC } from 'react'

import { Typography } from '@/shared/components'

type Props = {
  filterClass: string
  setFilterClass: (v: string) => void

  photo: any
}
export const NormalFilter: FC<Props> = ({ filterClass, setFilterClass, photo }) => {
  console.log({ photo })

  return (
    <div>
      <div
        className={`filter-item ${filterClass === 'filter-normal' ? 'filter-item--selected' : ''}`}
        onClick={() => setFilterClass('filter-normal')}
      >
        <div style={{ width: '108px', height: '108px' }}>
          <img src={photo} alt="Normal" />
        </div>

        <Typography variant={'regular_text_16'} style={{ textAlign: 'center' }}>
          Normal
        </Typography>
      </div>
    </div>
  )
}
