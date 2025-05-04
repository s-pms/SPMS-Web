import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 采购单状态枚举字典
 *
 * @author Hamm.cn
 */
export class PickingStatusEnum extends WebEnum {
  static readonly AUDITING = new PickingStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new PickingStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly OUTPUTTING = new PickingStatusEnum(3, '出库中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new PickingStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)
}
