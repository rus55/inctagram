import React, { useState } from 'react'

import { Filter } from '@/shared/assets/icons/Filter'
import { Polygon } from '@/shared/assets/icons/Polygon'
import { PolygonUp } from '@/shared/assets/icons/PolygonUp'
import { SortDirection } from '@/shared/constants/enum'

export const useSortBy = () => {
  const [sort, setSort] = useState<SortDirection | 'default'>(SortDirection.DESC)

  const onSortChange = () => {
    if (sort === SortDirection.DESC) setSort(SortDirection.ASC)
    if (sort === SortDirection.ASC) setSort('default')
    if (sort === 'default') setSort(SortDirection.DESC)
  }

  const icon = () => {
    if (sort === SortDirection.DESC) return <Polygon />
    if (sort === SortDirection.ASC) return <PolygonUp />
    if (sort === 'default') return <Filter />
  }

  return { icon, onSortChange, sort }
}
