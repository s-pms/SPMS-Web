import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 出库类型枚举字典
 *
 * @author Hamm.cn
 */
export class OutputTypeEnum extends WebEnum {
  static readonly NORMAL = new OutputTypeEnum(1, '普通出库')
    .setColor(WebColor.WARNING)

  static readonly MOVE = new OutputTypeEnum(2, '移动出库')
    .setColor(WebColor.NORMAL)

  static readonly SALE = new OutputTypeEnum(3, '销售出库')
    .setColor(WebColor.SUCCESS)

  static readonly PICKING = new OutputTypeEnum(4, '领料出库')
    .setColor(WebColor.NORMAL)
}
