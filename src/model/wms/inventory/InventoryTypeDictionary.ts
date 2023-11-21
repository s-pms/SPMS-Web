import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { InventoryType } from './InventoryType'

export const InventoryTypeDictionary = AirDictionaryArray.create([
  { key: InventoryType.STORAGE, label: '按存储资源' },
  { key: InventoryType.STRUCTURE, label: '按工厂结构' },
])
