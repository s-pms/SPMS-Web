import { WebColor, WebEnum } from '@airpower/web'

export class ContractStatusEnum extends WebEnum {
  static readonly INVALID = new ContractStatusEnum(1, '未生效')
    .setColor(WebColor.NORMAL)

  static readonly EFFECTIVE = new ContractStatusEnum(2, '生效中')
    .setColor(WebColor.SUCCESS)

  static readonly TERMINATED = new ContractStatusEnum(3, '已终止')
    .setColor(WebColor.DANGER)
}
