import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { DeviceStatus } from './DeviceStatus'

export const DeviceStatusDictionary = AirDictionaryArray.create([
  { key: DeviceStatus.ALARM, label: '报警', color: '#F5280C' },
  { key: DeviceStatus.RUNNING, label: '运行', color: '#4ECF1F' },
  { key: DeviceStatus.FREE, label: '空闲', color: '#5a9cf8' },
  { key: DeviceStatus.DOWN, label: '关机', color: '#606765' },
  { key: DeviceStatus.DEBUG, label: '维护', color: '#1B24F7' },
])
