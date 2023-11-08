import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { MaterialType } from './MaterialType'
import { AirColor } from '@/airpower/enum/AirColor'

export const MaterialTypeDictionary = AirDictionaryArray.create([
  { key: MaterialType.PRODUCT, label: '自产品', color: AirColor.SUCCESS },
  { key: MaterialType.PURCHASE, label: '外购品', color: AirColor.WARNING },
])
