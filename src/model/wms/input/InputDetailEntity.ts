import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'

@Model('入库明细')
export class InputDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(StorageEntity) storage!: StorageEntity

  @Type(MaterialEntity) material!: MaterialEntity

  @Table({ forceShow: true })
  @Field('物料编码') materialCode!: string

  @Table({ forceShow: true })
  @Field('物料名称') materialName!: string

  @Field('目标存储资源') storageName!: string

  @Form({
    requiredNumber: true,
  })
  @Field('物料')
  @Type(Number) materialId!: number

  @Field('入库数量')
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

  @Field('已入库数量')
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number

  @Form({
    requiredNumber: true,
  })
  @Field('目标存储资源') storageId !: number
}
