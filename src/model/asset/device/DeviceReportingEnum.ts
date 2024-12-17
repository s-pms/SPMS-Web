import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 设备上报状态
 *
 * @author Hamm
 */
export class DeviceReportingEnum extends AirEnum<boolean> {
  /**
   * ### 开启
   */
  static readonly ENABLE = new DeviceReportingEnum(true, '开启', AirColor.SUCCESS)

  /**
   * ### 关闭
   */
  static readonly DISABLE = new DeviceReportingEnum(false, '关闭', AirColor.NORMAL)
}
