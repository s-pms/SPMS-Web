import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 订单类型枚举字典
 *
 * @author Hamm.cn
 */
export class OrderTypeEnum extends WebEnum {
  static readonly PLAN = new OrderTypeEnum(1, '计划订单')
    .setColor(WebColor.SUCCESS)

  static readonly OTHER = new OrderTypeEnum(2, '其他订单')
    .setColor(WebColor.WARNING)
}
