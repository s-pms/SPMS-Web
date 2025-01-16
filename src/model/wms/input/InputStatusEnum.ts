import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 入库状态枚举字典
 *
 * @author Hamm.cn
 */
export class InputStatusEnum extends AirEnum {
  static AUDITING = new InputStatusEnum(1, '审核中', AirColor.WARNING)

  static REJECTED = new InputStatusEnum(2, '已驳回', AirColor.DANGER)

  static INPUTTING = new InputStatusEnum(3, '入库中', AirColor.NORMAL)

  static DONE = new InputStatusEnum(4, '已完成', AirColor.SUCCESS)
}
