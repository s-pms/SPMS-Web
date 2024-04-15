import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { ParameterType } from './ParameterType'

export const ParameterTypeDictionary = AirDictionaryArray.create([
  { key: ParameterType.QUANTITY, label: '数字' },
  { key: ParameterType.STATUS, label: '状态' },
  { key: ParameterType.SWITCH, label: '开关' },
  { key: ParameterType.INFORMATION, label: '信息' },
])
