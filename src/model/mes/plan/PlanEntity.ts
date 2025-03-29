import type { AirEnum } from '@airpower/base/AirEnum'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { Field, Form, Model, Table } from '@airpower/decorator'
import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { AirDateTimeType } from '@airpower/enum/AirDateTimeType'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import { PlanDetailEntity } from './PlanDetailEntity'
import { PlanStatusEnum } from './PlanStatusEnum'
import { PlanTypeEnum } from './PlanTypeEnum'

@Model({
  label: '生产计划',
})
export class PlanEntity extends AbstractBaseBillEntity<PlanDetailEntity> {
  @Field({
    label: '生产计划号',
  })
  declare billCode: string

  @Table()
  @Field({
    label: '客户编码',
  })
  customerCode!: string

  @Table()
  @Field({
    label: '客户名称',
  })
  customerName!: string

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '客户信息',
  })
  customerId!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Field({
    label: '计划状态',
    dictionary: PlanStatusEnum,
  })
  status!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: PlanTypeEnum.SALE.key,
    clearable: false,
    requiredNumber: true,
    showColor: true,
  })
  @Field({
    label: '计划类型',
    dictionary: PlanTypeEnum,
  })
  type!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Form({
    defaultValue: AirDateTime.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field({
    label: '开始时间',
  })
  startTime!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Form({
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field({
    label: '交付时间',
  })
  deliverTime!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field({
    label: '完成时间',
  })
  finishTime!: number

  @Field({
    label: '计划明细',
    type: PlanDetailEntity,
    array: true,
  })
  details: PlanDetailEntity[] = []

  @Field({
    label: '客户信息',
    type: CustomerEntity,
  })
  @Form({
    requiredPayload: true,
  })
  customer!: CustomerEntity

  getAuditingStatus(): AirEnum {
    return PlanStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return PlanStatusEnum.PRODUCING
  }

  getRejectedStatus(): AirEnum {
    return PlanStatusEnum.REJECTED
  }
}
