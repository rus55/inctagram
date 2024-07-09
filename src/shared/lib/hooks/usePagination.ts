import { useState } from 'react'

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('createdAt')

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
  }
}

export default usePagination
