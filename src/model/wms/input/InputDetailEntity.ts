import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'

@Model({
  label: '入库明细',
})
export class InputDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(StorageEntity)
  storage!: StorageEntity

  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Table({
    force: true,
    formatter: row => row.material.code,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    force: true,
    formatter: row => row.material.name,
  })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Field({
    label: '目标仓库',
  })
  storageName!: string

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '物料',
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
    label: '入库数量',
  })
  quantity!: number

  @Table({
    align: 'right',
    width: 150,
    order: -3,
  })
  @Field({
    label: '已入库数量',
  })
  @Form({
    number: true,
  })
  finishQuantity!: number

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '目标仓库',
  })
  storageId!: number
}
