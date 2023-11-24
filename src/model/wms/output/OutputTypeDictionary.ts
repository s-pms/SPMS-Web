import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { OutputType } from './OutputType'

/**
 * # 出库类型枚举字典
 *
 * @author Hamm
 */
export const OutputTypeDictionary = AirDictionaryArray.create([
  { key: OutputType.NORMAL, color: AirColor.WARNING, label: '普通出库' },
  {
    key: OutputType.MOVE, color: AirColor.NORMAL, label: '移动出库', disabled: true,
  },
  { key: OutputType.SALE, color: AirColor.SUCCESS, label: '销售出库' },
])
