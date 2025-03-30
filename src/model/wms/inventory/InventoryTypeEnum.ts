import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class InventoryTypeEnum extends AirEnum {
  static readonly STORAGE = new InventoryTypeEnum(1, '按仓库', AirColor.NORMAL)

  static readonly STRUCTURE = new InventoryTypeEnum(2, '按生产单元', AirColor.SUCCESS)
}
