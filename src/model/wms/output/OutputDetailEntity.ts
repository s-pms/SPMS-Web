import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

@ClassName('出库明细')
export class OutputDetailEntity extends AbstractBaseBillDetailEntity {
  billId!: number

  @Type(InventoryEntity) inventory!: InventoryEntity

  @Type(MaterialEntity) material!: MaterialEntity

  @TableField({ forceShow: true })
  @FieldName('物料编码') materialCode!: string

  @TableField({ forceShow: true })
  @FieldName('物料名称') materialName!: string

  @TableField({ forceShow: true })
  @FieldName('来源存储资源') storageName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料信息') materialId!: number

  @FieldName('出库数量')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @FieldName('已出库数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number

  @FormField({
    requiredNumber: true,
  })
  @FieldName('库存来源') inventoryId !: number
}
