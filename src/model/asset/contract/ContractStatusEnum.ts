import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class ContractStatusEnum extends AirEnum {
  static readonly INVALID = new ContractStatusEnum(1, '未生效', AirColor.NORMAL)
  static readonly EFFECTIVE = new ContractStatusEnum(2, '生效中', AirColor.SUCCESS)
  static readonly TERMINATED = new ContractStatusEnum(3, '已终止', AirColor.DANGER)
}
