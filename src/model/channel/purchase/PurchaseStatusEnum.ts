import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 采购单状态枚举字典
 *
 * @author Hamm.cn
 */
export class PurchaseStatusEnum extends WebEnum {
  static readonly AUDITING = new PurchaseStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new PurchaseStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly PURCHASING = new PurchaseStatusEnum(3, '采购中')
    .setColor(WebColor.WARNING)

  static readonly INPUTTING = new PurchaseStatusEnum(4, '入库中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new PurchaseStatusEnum(5, '已完成')
    .setColor(WebColor.SUCCESS)
}
