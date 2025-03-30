import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm.cn
 */
export class PlanStatusEnum extends AirEnum {
  static readonly AUDITING = new PlanStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new PlanStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PRODUCING = new PlanStatusEnum(3, '生产中', AirColor.NORMAL)

  static readonly DONE = new PlanStatusEnum(4, '已完成', AirColor.SUCCESS)

  static readonly CANCELED = new PlanStatusEnum(5, '已取消', AirColor.NORMAL)
}
