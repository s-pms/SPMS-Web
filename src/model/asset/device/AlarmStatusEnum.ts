import { AirColor } from '@airpower/enum/AirColor'
import { AirEnum } from '@airpower/base/AirEnum'

export class AlarmStatusEnum extends AirEnum {
  static readonly NONE = new AlarmStatusEnum(0, '正常运行', AirColor.SUCCESS)

  static readonly SYSTEM = new AlarmStatusEnum(1, '系统报警', AirColor.DANGER)

  static readonly MANUAL = new AlarmStatusEnum(2, '手动报警', AirColor.WARNING)
}
