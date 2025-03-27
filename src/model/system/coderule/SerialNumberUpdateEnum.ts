import { AirColor } from '@airpower/enum/AirColor'
import { AirEnum } from '@airpower/base/AirEnum'

/**
 * # 序列号更新方式字典
 *
 * @author Hamm.cn
 */
export class SerialNumberUpdateEnum extends AirEnum {
  static readonly DAY = new SerialNumberUpdateEnum(1, '每日更新', AirColor.SUCCESS)

  static readonly MONTH = new SerialNumberUpdateEnum(2, '每月更新', AirColor.WARNING)

  static readonly YEAR = new SerialNumberUpdateEnum(3, '每年更新', AirColor.DANGER)

  static readonly NEVER = new SerialNumberUpdateEnum(4, '不更新', AirColor.NORMAL)
}
