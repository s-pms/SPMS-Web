import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 序列号更新方式字典
 *
 * @author Hamm.cn
 */
export class SerialNumberUpdateEnum extends WebEnum {
  static readonly DAY = new SerialNumberUpdateEnum(1, '每日更新')
    .setColor(WebColor.SUCCESS)

  static readonly MONTH = new SerialNumberUpdateEnum(2, '每月更新')
    .setColor(WebColor.WARNING)

  static readonly YEAR = new SerialNumberUpdateEnum(3, '每年更新')
    .setColor(WebColor.DANGER)

  static readonly NEVER = new SerialNumberUpdateEnum(4, '不更新')
    .setColor(WebColor.NORMAL)
}
