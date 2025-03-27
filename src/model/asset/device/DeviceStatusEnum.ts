import { AirEnum } from '@airpower/base/AirEnum'

export class DeviceStatusEnum extends AirEnum {
  static readonly UNKNOWN = new DeviceStatusEnum(0, '未知', '#999')

  static readonly ALARM = new DeviceStatusEnum(1, '报警', '#e14027')

  static readonly RUNNING = new DeviceStatusEnum(2, '运行', '#73cc44')

  static readonly FREE = new DeviceStatusEnum(3, '空闲', '#e3d349')

  static readonly DOWN = new DeviceStatusEnum(4, '关机', '#616665')

  static readonly DEBUG = new DeviceStatusEnum(5, '调试', '#1d23ed')
}
