export type statusType =
  | 'Not Selected'
  | 'Blocked'
  | 'Not Blocked'
  | 'Не выбрано'
  | 'Заблокировано'
  | 'Не заблокировано'

export type BanType = 'Reason for ban' | 'Bad behavior' | 'Advertising placement' | 'Another reason'

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
export const getValueBanByLang = (value: BanType) => {
  const values = {
    'Reason for ban': 'reason_for_ban',
    'Bad behavior': 'bad_behavior',
    'Advertising placement': 'advertising_placement',
    'Another reason': 'another_reason',
    'Причина блокировки': 'reason_for_ban',
    'Плохое поведение': 'bad_behavior',
    'Размещение рекламы': 'advertising_placement',
    'Другая причина': 'another_reason',
  }

  return values[value]
}
