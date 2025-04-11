import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class ContractTypeEnum extends AirEnum {
  static readonly OTHER = new ContractTypeEnum(0, '其他合同', AirColor.NORMAL)
  static readonly SALE = new ContractTypeEnum(1, '销售合同', AirColor.SUCCESS)
  static readonly PURCHASE = new ContractTypeEnum(2, '采购合同', AirColor.DANGER)
  static readonly LABOR = new ContractTypeEnum(3, '劳动合同', AirColor.WARNING)
}
