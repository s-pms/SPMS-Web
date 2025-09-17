import {AbstractBaseBillEntity} from '@/base/bill/AbstractBaseBillEntity'
import {StructureEntity} from '@/model/factory/structure/StructureEntity'
import type {WebEnum} from '@airpower/web'
import {Field, Form, Model, Table, Type} from '@airpower/web'
import {PickingDetailEntity} from './PickingDetailEntity'
import {PickingStatusEnum} from './PickingStatusEnum'

@Model({
  label: '领料单',
})
export class PickingEntity extends AbstractBaseBillEntity<PickingDetailEntity> {
  @Field({
    label: '申领单号',
  })
  declare billCode: string

  @Table({
    width: 100,
    color: true,
    order: -80,
    force: true,
  })
  @Field({
    label: '申领状态',
    dictionary: PickingStatusEnum,
  })
  status!: number

  @Field({
    label: '申领明细',
  })
  @Type(PickingDetailEntity, true)
  details: PickingDetailEntity[] = []

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '生产单元',
  })
  @Type(StructureEntity)
  @Table({
    width: 200,
    order: -70,
    payload: true,
  })
  structure!: StructureEntity

  getAuditingStatus(): WebEnum {
    return PickingStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return PickingStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): WebEnum {
    return PickingStatusEnum.REJECTED
  }
}
