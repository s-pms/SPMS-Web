import type { WebEnum } from '@airpower/web'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'
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

  @Table({
    formatter: row => `${row.storage.name}(${row.storage.code})`,
  })
  @Field({
    label: '目标仓库',
  })
  storageName!: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '目标仓库',
  })
  @Type(StorageEntity)
  storage!: StorageEntity

  @Table({
    width: 100,
    color: true,
    order: -80,
    force: true,
  })
  @Field({
    label: '移库状态',
    dictionary: MoveStatusEnum,
  })
  status!: number

  @Field({
    label: '移库明细',
  })
  @Type(MoveDetailEntity, true)
  details: MoveDetailEntity[] = []

  getAuditingStatus(): WebEnum {
    return MoveStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return MoveStatusEnum.MOVING
  }

  getRejectedStatus(): WebEnum {
    return MoveStatusEnum.REJECTED
  }
}
