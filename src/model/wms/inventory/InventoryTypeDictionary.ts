import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { InventoryType } from './InventoryType'
import { AirColor } from '@/airpower/enum/AirColor'

export const InventoryTypeDictionary = AirDictionaryArray.create([
  { key: InventoryType.STORAGE, label: '按存储资源', color: AirColor.NORMAL },
  { key: InventoryType.STRUCTURE, label: '按工厂结构', color: AirColor.SUCCESS },
])
