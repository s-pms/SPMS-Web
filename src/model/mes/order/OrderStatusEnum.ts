import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm.cn
 */
export class OrderStatusEnum extends AirEnum {
  static readonly AUDITING = new OrderStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new OrderStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PREPARE = new OrderStatusEnum(3, '准备中', AirColor.WARNING)

  static readonly PRODUCING = new OrderStatusEnum(4, '生产中', AirColor.WARNING)

  static readonly INPUTTING = new OrderStatusEnum(5, '入库中', AirColor.NORMAL)

  static readonly DONE = new OrderStatusEnum(6, '已完成', AirColor.SUCCESS)

  static readonly PAUSED = new OrderStatusEnum(7, '已暂停', AirColor.WARNING)
}
