import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

/**
 * # 禁用状态字典
 * @author Hamm
 */
export const DisableDictionary = AirDictionaryArray.create([
  {
    key: true,
    label: '禁用',
    color: AirColor.DANGER,
  },
  {
    key: false,
    label: '正常',
    color: AirColor.SUCCESS,
  },
])
