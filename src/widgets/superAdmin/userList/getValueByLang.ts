export type statusType =
  | 'Not Selected'
  | 'Blocked'
  | 'Not Blocked'
  | 'Не выбрано'
  | 'Заблокировано'
  | 'Не заблокировано'

export const getValueByLang = (value: statusType) => {
  const values = {
    'Not Selected': 'not_selected',
    Blocked: 'blocked',
    'Not Blocked': 'not_blocked',
    'Не выбрано': 'not_selected',
    Заблокировано: 'blocked',
    'Не заблокировано': 'not_blocked',
  }

  return values[value]
}
