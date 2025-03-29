import type { AirEnum } from '@airpower/base/AirEnum'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { Field, Form, Model, Table } from '@airpower/decorator'
import { MoveDetailEntity } from './MoveDetailEntity'
import { MoveStatusEnum } from './MoveStatusEnum'

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
    label: '目标仓库',
  })
  storageName!: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '目标仓库',
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
