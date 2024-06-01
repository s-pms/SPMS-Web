import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 入库类型枚举字典
 *
 * @author Hamm
 */
export class InputTypeEnum extends AirEnum {
  static readonly NORMAL = new InputTypeEnum(1, '普通入库')

  static readonly MOVE = new InputTypeEnum(2, '移动入库', AirColor.NORMAL, true)

  static readonly PURCHASE = new InputTypeEnum(3, '采购入库')
}
