import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 设备上报状态
 *
 * @author Hamm.cn
 */
export class DeviceReportingEnum extends WebEnum<boolean> {
  /**
   * ### 开启
   */
  static readonly ENABLE = new DeviceReportingEnum(true, '开启')
    .setColor(WebColor.SUCCESS)

  /**
   * ### 关闭
   */
  static readonly DISABLE = new DeviceReportingEnum(false, '关闭')
    .setColor(WebColor.NORMAL)
}
