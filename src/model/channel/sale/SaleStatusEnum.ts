import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 销售单状态枚举字典
 *
 * @author Hamm.cn
 */
export class SaleStatusEnum extends AirEnum {
  static readonly AUDITING = new SaleStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new SaleStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly OUTPUTTING = new SaleStatusEnum(3, '出库中', AirColor.NORMAL)

  static readonly DONE = new SaleStatusEnum(4, '已完成', AirColor.SUCCESS)
}
