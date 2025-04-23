import { WebColor, WebEnum } from '@airpower/web'

export class MaterialUseTypeEnum extends WebEnum {
  static readonly TOOL = new MaterialUseTypeEnum(1, '工具类')
    .setColor(WebColor.SUCCESS)

  static readonly CONSUMABLE = new MaterialUseTypeEnum(2, '消耗品')
    .setColor(WebColor.WARNING)
}
