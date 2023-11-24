import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { InputType } from './InputType'

/**
 * # 入库类型枚举字典
 *
 * @author Hamm
 */
export const InputTypeDictionary = AirDictionaryArray.create([
  { key: InputType.NORMAL, color: AirColor.WARNING, label: '普通入库' },
  {
    key: InputType.MOVE, color: AirColor.NORMAL, label: '移动入库', disabled: true,
  },
  { key: InputType.PURCHASE, color: AirColor.WARNING, label: '采购入库' },
])
