import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { InputType } from './InputType'

/**
 * # 入库类型枚举字典
 *
 * @author Hamm
 */
export const InputTypeDictionary = AirDictionaryArray.create([
  { key: InputType.PURCHASE, color: AirColor.SUCCESS, label: '采购入库' },
  {
    key: InputType.RESTORE, color: AirColor.WARNING, label: '退料入库', disabled: true,
  },
  {
    key: InputType.PRODUCE, color: AirColor.SUCCESS, label: '生产入库', disabled: true,
  },
  {
    key: InputType.REVIEW, color: AirColor.DANGER, label: '盘点入库', disabled: true,
  },
  {
    key: InputType.MOVE, color: AirColor.WARNING, label: '移动入库', disabled: true,
  },
  { key: InputType.OTHER, color: AirColor.NORMAL, label: '其他入库' },
])
