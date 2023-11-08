import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { SerialNumberType } from './SerialNumberType'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 序列号更新方式字典
 *
 * @author Hamm
 */
export const SerialNumberUpdateDictionary = AirDictionaryArray.create([
  {
    key: SerialNumberType.DAY,
    label: '每日更新',
    color: AirColor.SUCCESS,
  },
  {
    key: SerialNumberType.MONTH,
    label: '每月更新',
    color: AirColor.WARNING,
  },
  {
    key: SerialNumberType.YEAR,
    label: '每年更新',
    color: AirColor.DANGER,
  },
  {
    key: SerialNumberType.NEVER,
    label: '不更新',
    color: AirColor.NORMAL,
  },
])
