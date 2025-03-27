import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'

@Model({
  label: '入库明细',
})
export class InputDetailEntity extends AbstractBaseBillDetailEntity {
  @Field({
    type: StorageEntity,
  })
    storage!: StorageEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Table({ forceShow: true })
  @Field({
    label: '物料编码',
  })
    materialCode!: string

  @Table({
    forceShow: true,
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
    type: Number,
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
    label: '入库数量',
    type: Number,
  })
    quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已入库数量',
    type: Number,
  })
    finishQuantity!: number

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '目标仓库',
  })
    storageId !: number
}
