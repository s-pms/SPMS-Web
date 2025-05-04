import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm.cn
 */
export class PlanStatusEnum extends WebEnum {
  static readonly AUDITING = new PlanStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new PlanStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly PRODUCING = new PlanStatusEnum(3, '生产中')
    .setColor(WebColor.NORMAL)

  static readonly DONE = new PlanStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)

  static readonly CANCELED = new PlanStatusEnum(5, '已取消')
    .setColor(WebColor.NORMAL)
}
