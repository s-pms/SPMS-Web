import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class MaterialTypeEnum extends AirEnum {
  static readonly PRODUCT = new MaterialTypeEnum(1, '自产品', AirColor.SUCCESS)

  static readonly PURCHASE = new MaterialTypeEnum(2, '外购品', AirColor.WARNING)
}
