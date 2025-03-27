import {
  Field, Form, Model, Search, Table,
} from '@airpower/decorator'
import { AirEnum } from '@airpower/base/AirEnum'
import { PickingStatusEnum } from './PickingStatusEnum'
import { PickingDetailEntity } from './PickingDetailEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'

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
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Field({
    label: '申领状态',
    dictionary: PickingStatusEnum,
  })
    status!: number

  @Field({
    label: '申领明细',
    type: PickingDetailEntity,
    array: true,
  })
    details: PickingDetailEntity[] = []

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '生产单元',
    type: StructureEntity,
  })
  @Table({
    width: 200,
    orderNumber: -70,
    payloadField: 'name',
  })
    structure!: StructureEntity

  getAuditingStatus(): AirEnum {
    return PickingStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return PickingStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): AirEnum {
    return PickingStatusEnum.REJECTED
  }
}
