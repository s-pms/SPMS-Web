import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { AlarmStatus } from './AlarmStatus'

export const AlarmStatusDictionary = AirDictionaryArray.create([
  { key: AlarmStatus.NONE, label: '暂无报警', color: AirColor.SUCCESS },
  { key: AlarmStatus.SYSTEM, label: '系统报警', color: AirColor.DANGER },
  { key: AlarmStatus.MANUAL, label: '手动报警', color: AirColor.WARNING },
])
