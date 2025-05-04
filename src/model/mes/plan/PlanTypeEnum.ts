import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 计划类型枚举字典
 *
 * @author Hamm.cn
 */
export class PlanTypeEnum extends WebEnum {
  static readonly INNER = new PlanTypeEnum(1, '内部计划')
    .setColor(WebColor.NORMAL)

  static readonly SALE = new PlanTypeEnum(2, '外销计划')
    .setColor(WebColor.SUCCESS)
}
