import { AirEnum } from '@/airpower/base/AirEnum'

export class ParameterTypeEnum extends AirEnum {
  static QUANTITY = new ParameterTypeEnum(1, '数字')

  static STATUS = new ParameterTypeEnum(2, '状态')

  static SWITCH = new ParameterTypeEnum(3, '开关')

  static INFORMATION = new ParameterTypeEnum(4, '信息')
}
