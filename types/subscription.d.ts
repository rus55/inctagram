type TypeRu = 'Персональный' | 'Бизнес'
type TypeEn = 'Personal' | 'Business'
type ValueType = TypeRu | TypeEn

type PriceEn = '$10 per 1 Day' | '$50 per 7 Day' | '$100 per month'
type PriceRu = '10$ за один день' | '50$ за неделю' | '100$ за месяц'
type ValuePriceType = PriceEn | PriceRu
type KeyDataType = ValuePriceType | string
type LangType = 'en' | 'ru'

type DataType = {
  [key in KeyDataType]: {amount: '10' | '50' | '100', period: 'DAY' | 'WEEKLY' | 'MONTHLY'}
}