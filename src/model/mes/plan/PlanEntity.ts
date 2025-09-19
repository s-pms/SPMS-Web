import type { WebEnum } from '@airpower/web'
import { DateTimeFormatter, DateTimeType, DateTimeUtil, Field, Form, Model, Table, Type } from '@airpower/web'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
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

  @Table({
    formatter: row => row.customer?.code || '-',
  })
  @Field({
    label: '客户编码',
  })
  customerCode!: string

  @Table({
    formatter: row => row.customer?.name || '-',
  })
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
    color: true,
  })
  @Field({
    label: '计划状态',
    dictionary: PlanStatusEnum,
  })
  status!: number

  @Table({
    width: 100,
    color: true,
  })
  @Form({
    defaultValue: PlanTypeEnum.SALE.key,
    clearable: false,
    requiredNumber: true,
    color: true,
  })
  @Field({
    label: '计划类型',
    dictionary: PlanTypeEnum,
  })
  type!: number

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
  })
  @Form({
    defaultValue: DateTimeUtil.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: DateTimeType.DATE,
    dateShowFormatter: DateTimeFormatter.FULL_DATE,
  })
  @Field({
    label: '开始时间',
  })
  startTime!: number

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
  })
  @Form({
    requiredNumber: true,
    dateType: DateTimeType.DATE,
    dateShowFormatter: DateTimeFormatter.FULL_DATE,
  })
  @Field({
    label: '交付时间',
  })
  deliverTime!: number

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
  })
  @Field({
    label: '完成时间',
  })
  finishTime!: number

  @Field({
    label: '计划明细',
  })
  @Type(PlanDetailEntity, true)
  details: PlanDetailEntity[] = []

  @Field({
    label: '客户信息',
  })
  @Type(CustomerEntity)
  @Form({
    requiredPayload: true,
  })
  customer!: CustomerEntity

  getAuditingStatus(): WebEnum {
    return PlanStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return PlanStatusEnum.PRODUCING
  }

  getRejectedStatus(): WebEnum {
    return PlanStatusEnum.REJECTED
  }
}
