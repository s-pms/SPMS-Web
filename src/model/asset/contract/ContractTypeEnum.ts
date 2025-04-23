import { WebColor, WebEnum } from '@airpower/web'

export class ContractTypeEnum extends WebEnum {
  static readonly OTHER = new ContractTypeEnum(0, '其他合同')
    .setColor(WebColor.NORMAL)

  static readonly SALE = new ContractTypeEnum(1, '销售合同')
    .setColor(WebColor.SUCCESS)

  static readonly PURCHASE = new ContractTypeEnum(2, '采购合同')
    .setColor(WebColor.DANGER)

  static readonly LABOR = new ContractTypeEnum(3, '劳动合同')
    .setColor(WebColor.WARNING)
}
