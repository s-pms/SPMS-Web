import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 出库状态枚举字典
 *
 * @author Hamm.cn
 */
export class OutputStatusEnum extends WebEnum {
  static readonly AUDITING = new OutputStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new OutputStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly OUTPUTTING = new OutputStatusEnum(3, '出库中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new OutputStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)
}
