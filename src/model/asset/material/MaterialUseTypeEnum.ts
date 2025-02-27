import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

export class MaterialUseTypeEnum extends AirEnum {
  static readonly TOOL = new MaterialUseTypeEnum(1, '工具类', AirColor.SUCCESS)

  static readonly CONSUMABLE = new MaterialUseTypeEnum(2, '消耗品', AirColor.WARNING)
}
