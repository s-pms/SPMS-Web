import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { MoveDetailEntity } from './MoveDetailEntity'
import { MoveStatus } from './MoveStatus'
import { MoveStatusDictionary } from './MoveStatusDictionary'

@Model('移库单')
export class MoveEntity extends AbstractBaseBillEntity<MoveDetailEntity> {
  @Field('移库单号') declare billCode: string

  @Table()
  @Field('目标存储资源') storageName!: string

  @Form({
    requiredNumber: true,
  })
  @Field('目标存储资源')
  @Type(Number) storageId!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(MoveStatusDictionary)
  @Field('移库状态') status!: MoveStatus

  @Field('目标存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @Field('移库明细')
  @Type(MoveDetailEntity, true) details: MoveDetailEntity[] = []
}
