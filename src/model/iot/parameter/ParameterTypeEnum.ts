import { AirEnum } from '@airpower/base/AirEnum'

export class ParameterTypeEnum extends AirEnum {
  static NUMBER = new ParameterTypeEnum(1, '数字')

  static STATUS = new ParameterTypeEnum(2, '状态')

  static BOOLEAN = new ParameterTypeEnum(3, '开关')

  static STRING = new ParameterTypeEnum(4, '信息')
}
