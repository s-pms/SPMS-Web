import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 移库状态枚举字典
 *
 * @author Hamm.cn
 */
export class MoveStatusEnum extends AirEnum {
  static readonly AUDITING = new MoveStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new MoveStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly MOVING = new MoveStatusEnum(3, '移动中', AirColor.NORMAL)

  static readonly DONE = new MoveStatusEnum(4, '已完成', AirColor.SUCCESS)
}
