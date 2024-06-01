import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { PlanDetailEntity } from './PlanDetailEntity'
import { PlanStatusEnum } from './PlanStatusEnum'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { PlanTypeEnum } from './PlanTypeEnum'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeType } from '@/airpower/enum/AirDateTimeType'
import { Table } from '@/airpower/decorator/TableField'
import { Form } from '@/airpower/decorator/FormField'

@Model('生产计划')
export class PlanEntity extends AbstractBaseBillEntity<PlanDetailEntity> {
  @Field('生产计划号') declare billCode: string

  @Table()
  @Field('客户编码') customerCode!: string

  @Table()
  @Field('客户名称') customerName!: string

  @Form({
    requiredNumber: true,
  })
  @Field('客户信息') customerId!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Dictionary(PlanStatusEnum)
  @Field('计划状态') status!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: PlanTypeEnum.SALE.key,
    clearable: false,
    requiredNumber: true,
  })
  @Dictionary(PlanTypeEnum)
  @Field('计划类型') type!: number

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
  @Field('开始时间') startTime!: number

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
  @Field('交付时间') deliverTime!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field('完成时间') finishTime!: number

  @Field('计划明细')
  @Type(PlanDetailEntity, true) details: PlanDetailEntity[] = []

  @Type(CustomerEntity)
  @Field('客户信息') customer!: CustomerEntity
}
