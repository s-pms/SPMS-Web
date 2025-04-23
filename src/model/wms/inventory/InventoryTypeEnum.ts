import { WebColor, WebEnum } from '@airpower/web'

export class InventoryTypeEnum extends WebEnum {
  static readonly STORAGE = new InventoryTypeEnum(1, '按仓库')
    .setColor(WebColor.NORMAL)

  static readonly STRUCTURE = new InventoryTypeEnum(2, '按生产单元')
    .setColor(WebColor.SUCCESS)
}
