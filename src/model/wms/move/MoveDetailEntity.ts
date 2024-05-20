import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'

@Model('移库明细')
export class MoveDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(InventoryEntity) inventory!: InventoryEntity

  @Table({ forceShow: true })
  @Field('物料编码') materialCode!: string

  @Table({ forceShow: true })
  @Field('物料名称') materialName!: string

  @Table()
  @Field('来源存储资源') storageName!: string

  @Field('移动数量')
  @Form({
    requiredNumber: true,
    number: true,
    suffixText: '-',
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @Field('已移动数量')
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number
}
