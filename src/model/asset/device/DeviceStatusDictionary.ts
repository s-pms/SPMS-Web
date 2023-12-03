import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { DeviceStatus } from './DeviceStatus'
import { AirColor } from '@/airpower/enum/AirColor'

export const DeviceStatusDictionary = AirDictionaryArray.create([
  { key: DeviceStatus.ALARM, label: '维护', color: AirColor.WARNING },
  { key: DeviceStatus.RUNNING, label: '运行', color: AirColor.SUCCESS },
  { key: DeviceStatus.FREE, label: '空闲', color: '#5a9cf8' },
  { key: DeviceStatus.DOWN, label: '关机', color: AirColor.NORMAL },
  { key: DeviceStatus.DEBUG, label: '维护', color: AirColor.WARNING },
])
