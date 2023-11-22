import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { OutputType } from './OutputType'

/**
 * # 出库类型枚举字典
 *
 * @author Hamm
 */
export const OutputTypeDictionary = AirDictionaryArray.create([
  { key: OutputType.SALE, color: AirColor.SUCCESS, label: '销售出库' },
  {
    key: OutputType.PICKOUT, color: AirColor.NORMAL, label: '领料出库', disabled: true,
  },
  {
    key: OutputType.REVIEW, color: AirColor.DANGER, label: '盘点出库', disabled: true,
  },
  {
    key: OutputType.MOVE, color: AirColor.NORMAL, label: '移动出库', disabled: true,
  },
  { key: OutputType.OTHER, color: AirColor.WARNING, label: '其他出库' },
])
