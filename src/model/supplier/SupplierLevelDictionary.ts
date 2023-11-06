import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { SupplierLevel } from './SupplierLevel'
import { AirColor } from '@/airpower/enum/AirColor'

export const SupplierLevelDictionary = AirDictionaryArray.create([
  {
    key: SupplierLevel.GOLD, label: '金牌', color: AirColor.SUCCESS,
  }, {
    key: SupplierLevel.SILVER, label: '银牌', color: AirColor.WARNING,
  }, {
    key: SupplierLevel.COPPER, label: '铜牌', color: AirColor.NORMAL,
  },
])
