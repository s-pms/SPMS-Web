import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 订单类型枚举字典
 *
 * @author Hamm.cn
 */
export class OrderTypeEnum extends AirEnum {
  static readonly PLAN = new OrderTypeEnum(1, '计划订单', AirColor.SUCCESS)

  static readonly OTHER = new OrderTypeEnum(2, '其他订单', AirColor.WARNING)
}
