import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 采购单状态枚举字典
 *
 * @author Hamm.cn
 */
export class PickingStatusEnum extends AirEnum {
  static readonly AUDITING = new PickingStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new PickingStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly OUTPUTTING = new PickingStatusEnum(3, '出库中', AirColor.NORMAL)

  static readonly DONE = new PickingStatusEnum(4, '已完成', AirColor.SUCCESS)
}
