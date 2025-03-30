import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class ParameterSystemEnum extends AirEnum<boolean> {
  static readonly DEFINE = new ParameterSystemEnum(false, '定义参数', AirColor.NORMAL)

  static readonly SYSTEM = new ParameterSystemEnum(true, '系统参数', AirColor.DANGER)
}
