import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

export class InventoryTypeEnum extends AirEnum {
  static readonly STORAGE = new InventoryTypeEnum(1, '按存储资源', AirColor.NORMAL)

  static readonly STRUCTURE = new InventoryTypeEnum(2, '按工厂结构', AirColor.SUCCESS, true)
}
