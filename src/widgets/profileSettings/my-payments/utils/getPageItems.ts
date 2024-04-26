import { IPayments } from '@/shared/types'

export function getPageItems(currentPage: number, itemsPerPage: number, array: IPayments[]) {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return array.slice(startIndex, endIndex)
}