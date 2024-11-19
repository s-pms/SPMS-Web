import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { OutputDetailEntity } from './OutputDetailEntity'
import { OutputTypeEnum } from './OutputTypeEnum'
import { OutputStatusEnum } from './OutputStatusEnum'
import { MoveEntity } from '../move/MoveEntity'
import { AirEnum } from '@/airpower/base/AirEnum'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

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
    showColor: true,
    forceShow: true,
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
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Field({
    label: '出库状态',
    dictionary: OutputStatusEnum,
  })
    status!: number

  @Field({
    label: '出库明细',
    dictionary: OutputDetailEntity,
    array: true,
  })
    details: OutputDetailEntity[] = []

  @Field({
    label: '采购单',
    dictionary: SaleEntity,
  })
    sale!: SaleEntity

  @Field({
    label: '移库单',
    type: MoveEntity,
  })
    move!: MoveEntity

  getAuditingStatus(): AirEnum {
    return OutputStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return OutputStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): AirEnum {
    return OutputStatusEnum.REJECTED
  }
}
