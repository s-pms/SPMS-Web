import { WebColor, WebEnum } from '@airpower/web'

export class MaterialTypeEnum extends WebEnum {
  static readonly PRODUCT = new MaterialTypeEnum(1, '自产品')
    .setColor(WebColor.SUCCESS)

  static readonly PURCHASE = new MaterialTypeEnum(2, '外购品')
    .setColor(WebColor.WARNING)
}
