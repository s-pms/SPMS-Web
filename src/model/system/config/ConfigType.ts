import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

export class ConfigType extends AirEnum {
  static readonly STRING = new ConfigType(0, '字符串', AirColor.SUCCESS)

  static readonly BOOLEAN = new ConfigType(1, '布尔', AirColor.WARNING)

  static readonly NUMBER = new ConfigType(2, '数字', AirColor.DANGER)
}
