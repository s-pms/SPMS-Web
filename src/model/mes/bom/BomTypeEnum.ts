import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 配方类型枚举字典
 *
 * @author Hamm.cn
 */
export class BomTypeEnum extends WebEnum {
  static readonly NORMAL = new BomTypeEnum(1, '普通配方')
    .setColor(WebColor.SUCCESS)

  static readonly OPERATION = new BomTypeEnum(2, '工序配方')
    .setColor(WebColor.WARNING)
}
