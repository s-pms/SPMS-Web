import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const ParameterSystemDictionary = AirDictionaryArray.create([
  { key: false, label: '定义参数', color: AirColor.NORMAL },
  { key: true, label: '系统参数', color: AirColor.DANGER },
])
