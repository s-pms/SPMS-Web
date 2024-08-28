import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const OrderNumberDictionary = AirDictionaryArray.create(
  Array.from({ length: 100 }, (_, i) => i + 1).map((order) => ({ key: order, label: order.toString() })),
)
