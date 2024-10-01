export const setLocalStorageAndValue = (
  type: ValueType,
  value: PriceType,
  setValueType: (value: ValueType) => void
) => {
  localStorage.setItem(value, type)
  setValueType(type)
}
