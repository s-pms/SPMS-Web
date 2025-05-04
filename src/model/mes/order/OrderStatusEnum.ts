import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm.cn
 */
export class OrderStatusEnum extends WebEnum {
  static readonly AUDITING = new OrderStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new OrderStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly PREPARE = new OrderStatusEnum(3, '准备中')
    .setColor(WebColor.WARNING)

  static readonly PRODUCING = new OrderStatusEnum(4, '生产中')
    .setColor(WebColor.WARNING)

  static readonly INPUTTING = new OrderStatusEnum(5, '入库中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new OrderStatusEnum(6, '已完成')
    .setColor(WebColor.SUCCESS)

  static readonly PAUSED = new OrderStatusEnum(7, '已暂停')
    .setColor(WebColor.WARNING)
}
