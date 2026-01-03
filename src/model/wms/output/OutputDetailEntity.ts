import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'
import { InventoryEntity } from '../inventory/InventoryEntity'

@Model({
  label: '出库明细',
})
export class OutputDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(InventoryEntity)
  inventory!: InventoryEntity

  @Type(MaterialEntity)
  @Form({
    requiredPayload: true,
  })
  material!: MaterialEntity

  @Table({
    force: true,
    formatter: row => row.material.code,
    copy: true,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    force: true,
    formatter: row => row.material.name,
    copy: true,
  })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Field({
    label: '来源仓库',
  })
  @Table({
    formatter: row => `${row.inventory?.storage.name || '-'}(${row.inventory?.storage.code || '-'})`,
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
    order: -2,
    force: true,
  })
  @Field({
    label: '出库数量',
  })
  quantity!: number

  @Table({
    align: 'right',
    width: 150,
    order: -3,
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
  inventoryId!: number
}
