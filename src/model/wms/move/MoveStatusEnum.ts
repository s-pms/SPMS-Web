import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 移库状态枚举字典
 *
 * @author Hamm.cn
 */
export class MoveStatusEnum extends WebEnum {
  static readonly AUDITING = new MoveStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new MoveStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly MOVING = new MoveStatusEnum(3, '移动中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new MoveStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)
}
