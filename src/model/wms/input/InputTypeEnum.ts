import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 入库类型枚举字典
 *
 * @author Hamm.cn
 */
export class InputTypeEnum extends WebEnum {
  static readonly NORMAL = new InputTypeEnum(1, '普通入库')
    .setColor(WebColor.WARNING)

  static readonly MOVE = new InputTypeEnum(2, '移动入库')
    .setColor(WebColor.NORMAL)

  static readonly PURCHASE = new InputTypeEnum(3, '采购入库')
    .setColor(WebColor.WARNING)

  static readonly PRODUCTION = new InputTypeEnum(4, '生产入库')
    .setColor(WebColor.SUCCESS)
}
