import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const UserSystemDictionary = AirDictionaryArray.create([
  { key: false, label: '普通用户', color: AirColor.NORMAL },
  { key: true, label: '系统用户', color: AirColor.DANGER },
])
