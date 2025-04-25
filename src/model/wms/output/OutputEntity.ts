import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import type { WebEnum } from '@airpower/web'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { MoveEntity } from '../move/MoveEntity'
import { OutputDetailEntity } from './OutputDetailEntity'
import { OutputStatusEnum } from './OutputStatusEnum'
import { OutputTypeEnum } from './OutputTypeEnum'

@Model({
  label: '出库单',
})
export class OutputEntity extends AbstractBaseBillEntity<OutputDetailEntity> {
  @Field({
    label: '出库单号',
  })
  declare billCode: string

  @Table({
    width: 100,
    color: true,
    force: true,
  })
  @Form({
    defaultValue: OutputTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '出库类型',
    dictionary: OutputTypeEnum,
  })
  type!: number

  @Table({
    width: 100,
    color: true,
    order: -80,
    force: true,
  })
  @Search()
  @Field({
    label: '出库状态',
    dictionary: OutputStatusEnum,
  })
  status!: number

  @Field({
    label: '出库明细',
  })
  @Type(OutputDetailEntity, true)
  details: OutputDetailEntity[] = []

  @Field({
    label: '采购单',
  })
  @Type(SaleEntity)
  sale!: SaleEntity

  @Field({
    label: '移库单',
  })
  @Type(MoveEntity)
  move!: MoveEntity

  @Field({
    label: '领料单',
  })
  @Type(PickingEntity)
  picking!: PickingEntity

  getAuditingStatus(): WebEnum {
    return OutputStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return OutputStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): WebEnum {
    return OutputStatusEnum.REJECTED
  }
}
