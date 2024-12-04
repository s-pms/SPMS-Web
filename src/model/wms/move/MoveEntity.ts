import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { MoveDetailEntity } from './MoveDetailEntity'
import { MoveStatusEnum } from './MoveStatusEnum'
import { AirEnum } from '@/airpower/base/AirEnum'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '移库单',
})
export class MoveEntity extends AbstractBaseBillEntity<MoveDetailEntity> {
  @Field({
    label: '移库单号',
  })
  declare billCode: string

  @Table()
  @Field({
    label: '目标存储资源',
  })
    storageName!: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '目标存储资源',
    type: StorageEntity,
  })
    storage!: StorageEntity

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Field({
    label: '移库状态',
    dictionary: MoveStatusEnum,
  })
    status!: number

  @Field({
    label: '移库明细',
    type: MoveDetailEntity,
    array: true,
  })
    details: MoveDetailEntity[] = []

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
