import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'

@ClassName('移库明细')
export class MoveDetailEntity extends AbstractBaseBillDetailEntity {
  billId!: number

  @Type(InventoryEntity) inventory!: InventoryEntity

  @TableField({ forceShow: true })
  @FieldName('物料编码') materialCode!: string

  @TableField({ forceShow: true })
  @FieldName('物料名称') materialName!: string

  @TableField()
  @FieldName('来源存储资源') storageName!: string

  @FieldName('移动数量')
  @FormField({
    requiredNumber: true,
    number: true,
    suffixText: '-',
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @FieldName('已移动数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number
}
