import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 出库类型枚举字典
 *
 * @author Hamm
 */
export class OutputTypeEnum extends AirEnum {
  static readonly NORMAL = new OutputTypeEnum(1, '普通出库', AirColor.WARNING)

  static readonly MOVE = new OutputTypeEnum(2, '移动出库', AirColor.NORMAL)

  static readonly SALE = new OutputTypeEnum(3, '销售出库', AirColor.SUCCESS)
}
