export function getPageItems<T>(currentPage: number, itemsPerPage: number, array: T[]) {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return array.slice(startIndex, endIndex)
}
