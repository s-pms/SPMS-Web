import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'

export const DeviceReportingDictionary = AirDictionaryArray.create([
  { key: true, label: '开启', color: AirColor.SUCCESS },
  { key: false, label: '关闭', color: AirColor.NORMAL },
])
