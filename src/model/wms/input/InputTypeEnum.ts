import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 入库类型枚举字典
 *
 * @author Hamm.cn
 */
export class InputTypeEnum extends AirEnum {
  static readonly NORMAL = new InputTypeEnum(1, '普通入库', AirColor.WARNING)

  static readonly MOVE = new InputTypeEnum(2, '移动入库', AirColor.NORMAL)

  static readonly PURCHASE = new InputTypeEnum(3, '采购入库', AirColor.WARNING)

  static readonly PRODUCTION = new InputTypeEnum(4, '生产入库', AirColor.SUCCESS)
}
