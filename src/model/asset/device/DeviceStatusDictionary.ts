import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { DeviceStatus } from './DeviceStatus'

export const DeviceStatusDictionary = AirDictionaryArray.create([
  { key: DeviceStatus.ALARM, label: '报警', color: '#e14027' },
  { key: DeviceStatus.RUNNING, label: '运行', color: '#73cc44' },
  { key: DeviceStatus.FREE, label: '空闲', color: '#e3d349' },
  { key: DeviceStatus.DOWN, label: '关机', color: '#616665' },
  { key: DeviceStatus.DEBUG, label: '调试', color: '#1d23ed' },
])
