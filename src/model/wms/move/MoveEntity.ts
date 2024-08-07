import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { MoveDetailEntity } from './MoveDetailEntity'
import { MoveStatusEnum } from './MoveStatusEnum'
import { AirEnum } from '@/airpower/base/AirEnum'

@Model('移库单')
export class MoveEntity extends AbstractBaseBillEntity<MoveDetailEntity> {
  @Field('移库单号') declare billCode: string

  @Table()
  @Field('目标存储资源') storageName!: string

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(MoveStatusEnum)
  @Field('移库状态') status!: number

  @Field('目标存储资源')
  @Form({
    requiredPayload: true,
  })
  @Type(StorageEntity) storage!: StorageEntity

  @Field('移库明细')
  @Type(MoveDetailEntity, true) details: MoveDetailEntity[] = []

  getAuditingStatus(): AirEnum {
    return MoveStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return MoveStatusEnum.MOVING
  }

  getRejectedStatus(): AirEnum {
    return MoveStatusEnum.REJECTED
  }
}
