export function addLangValue<T>(lang: LangType, value: ValueType | ValuePriceType): T {
  const arrayValue = {
    en: {
      Personal: 'Personal',
      Business: 'Business',
      Персональный: 'Personal',
      Бизнес: 'Business',
      '$10 per 1 Day': '$10 per 1 Day',
      '$50 per 7 Day': '$50 per 7 Day',
      '$100 per month': '$100 per month',
      '10$ за один день': '$10 per 1 Day',
      '50$ за неделю': '$50 per 7 Day',
      '100$ за месяц': '$100 per month',
    } as const,
    ru: {
      Персональный: 'Персональный',
      Бизнес: 'Бизнес',
      Personal: 'Персональный',
      Business: 'Бизнес',
      '10$ за один день': '10$ за один день',
      '50$ за неделю': '50$ за неделю',
      '100$ за месяц': '100$ за месяц',
      '$10 per 1 Day': '10$ за один день',
      '$50 per 7 Day': '50$ за неделю',
      '$100 per month': '100$ за месяц',
    } as const,
  }

  return arrayValue[lang][value] as T
}
