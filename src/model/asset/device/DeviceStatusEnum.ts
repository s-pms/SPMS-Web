import { WebEnum } from '@airpower/web'

export class DeviceStatusEnum extends WebEnum {
  static readonly UNKNOWN = new DeviceStatusEnum(0, '未知')
    .setColor('#999')

  static readonly ALARM = new DeviceStatusEnum(1, '报警')
    .setColor('#e14027')

  static readonly RUNNING = new DeviceStatusEnum(2, '运行')
    .setColor('#73cc44')

  static readonly FREE = new DeviceStatusEnum(3, '空闲')
    .setColor('#e3d349')

  static readonly DOWN = new DeviceStatusEnum(4, '关机')
    .setColor('#616665')

  static readonly DEBUG = new DeviceStatusEnum(5, '调试')
    .setColor('#1d23ed')
}
