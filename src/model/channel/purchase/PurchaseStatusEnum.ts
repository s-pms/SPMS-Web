import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 采购单状态枚举字典
 *
 * @author Hamm.cn
 */
export class PurchaseStatusEnum extends AirEnum {
  static readonly AUDITING = new PurchaseStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new PurchaseStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PURCHASING = new PurchaseStatusEnum(3, '采购中', AirColor.WARNING)

  static readonly INPUTTING = new PurchaseStatusEnum(4, '入库中', AirColor.NORMAL)

  static readonly DONE = new PurchaseStatusEnum(5, '已完成', AirColor.SUCCESS)
}
