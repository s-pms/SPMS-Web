import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 出库状态枚举字典
 *
 * @author Hamm
 */
export class OutputStatusEnum extends AirEnum {
  static readonly AUDITING = new OutputStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new OutputStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly OUTPUTTING = new OutputStatusEnum(3, '出库中', AirColor.SUCCESS)

  static readonly DONE = new OutputStatusEnum(4, '已完成', AirColor.NORMAL)
}
