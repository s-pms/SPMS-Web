import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '出库明细',
})
export class OutputDetailEntity extends AbstractBaseBillDetailEntity {
  @Field({
    type: InventoryEntity,
  })
    inventory!: InventoryEntity

  @Field({
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Table({ forceShow: true })
  @Field({
    label: '物料编码',
  })
    materialCode!: string

  @Table({ forceShow: true })
  @Field({
    label: '物料名称',
  })
    materialName!: string

  @Field({
    label: '来源存储资源',
  })
    storageName!: string

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '物料信息',
  })
    materialId!: number

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
  @Field({
    label: '出库数量',
  })
    quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已出库数量',
  })
    finishQuantity!: number

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '库存来源',
  })
    inventoryId !: number
}
