import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const RoleSystemDictionary = AirDictionaryArray.create([
  { key: false, label: '普通角色', color: AirColor.NORMAL },
  { key: true, label: '系统角色', color: AirColor.DANGER },
])
