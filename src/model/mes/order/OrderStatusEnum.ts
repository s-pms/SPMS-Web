import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm
 */
export class OrderStatusEnum extends AirEnum {
  static readonly AUDITING = new OrderStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new OrderStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PRODUCING = new OrderStatusEnum(3, '生产中', AirColor.WARNING)

  static readonly DONE = new OrderStatusEnum(4, '已完成', AirColor.NORMAL)

  static readonly CANCELED = new OrderStatusEnum(5, '已取消', AirColor.NORMAL)
}
