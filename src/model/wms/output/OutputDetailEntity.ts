import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

@Model('出库明细')
export class OutputDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(InventoryEntity) inventory!: InventoryEntity

  @Type(MaterialEntity) material!: MaterialEntity

  @Table({ forceShow: true })
  @Field('物料编码') materialCode!: string

  @Table({ forceShow: true })
  @Field('物料名称') materialName!: string

  @Field('来源存储资源') storageName!: string

  @Form({
    requiredNumber: true,
  })
  @Field('物料信息') materialId!: number

  @Field('出库数量')
  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @Field('已出库数量')
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number

  @Form({
    requiredNumber: true,
  })
  @Field('库存来源') inventoryId !: number
}
