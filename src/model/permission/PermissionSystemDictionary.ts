import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const PermissionSystemDictionary = AirDictionaryArray.create([
  { key: false, label: '普通权限', color: AirColor.NORMAL },
  { key: true, label: '系统权限', color: AirColor.DANGER },
])
