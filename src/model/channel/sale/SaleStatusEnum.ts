import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 销售单状态枚举字典
 *
 * @author Hamm.cn
 */
export class SaleStatusEnum extends WebEnum {
  static readonly AUDITING = new SaleStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new SaleStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly OUTPUTTING = new SaleStatusEnum(3, '出库中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new SaleStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)
}
