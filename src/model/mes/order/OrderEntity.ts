import type { AirEnum } from '@airpower/base/AirEnum'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'
import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { AirDateTimeType } from '@airpower/enum/AirDateTimeType'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import { PlanEntity } from '../plan/PlanEntity'
import { OrderDetailEntity } from './OrderDetailEntity'
import { OrderStatusEnum } from './OrderStatusEnum'
import { OrderTypeEnum } from './OrderTypeEnum'

@Model({
  label: '生产订单',
})
export class OrderEntity extends AbstractBaseBillEntity<OrderDetailEntity> {
  @Field({
    label: '生产订单号',
  })
  declare billCode: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: MaterialEntity,
  })
  material!: MaterialEntity

  @Table({
    copyField: true,
    orderNumber: 88,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    orderNumber: 77,
    nowrap: true,
  })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: 66,
  })
  @Field({
    label: '生产数量',
    type: Number,
  })
  quantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: 66,
  })
  @Field({
    label: '完成数量',
    type: Number,
  })
  finishQuantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: 66,
    hide: true,
  })
  @Field({
    label: '异常数量',
    type: Number,
  })
  ngQuantity!: number

  @Table({
    copyField: true,
    hide: true,
  })
  @Field({
    label: '生产计划号',
  })
  planBillCode!: string

  @Table({
    width: 100,
    showColor: true,
  })
  @Field({
    label: '订单状态',
    dictionary: OrderStatusEnum,
  })
  status!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: OrderTypeEnum.OTHER.key,
    clearable: false,
    requiredNumber: true,
  })
  @Field({
    label: '订单类型',
    dictionary: OrderTypeEnum,
  })
  @Search()
  type!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
    hide: true,
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
    hide: true,
  })
  @Field({
    label: '完成时间',
  })
  finishTime!: number

  @Field({
    label: '订单明细',
    type: OrderDetailEntity,
    array: true,
  })
  details: OrderDetailEntity[] = []

  @Form({})
  @Table({
    orderNumber: 44,
    hide: true,
  })
  @Field({
    label: '客户信息',
    type: CustomerEntity,
  })
  customer!: CustomerEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '生产工艺',
    type: RoutingEntity,
  })
  routing!: RoutingEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '关联计划',
    type: PlanEntity,
  })
  plan!: PlanEntity

  getAuditingStatus(): AirEnum {
    return OrderStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return OrderStatusEnum.PRODUCING
  }

  getRejectedStatus(): AirEnum {
    return OrderStatusEnum.REJECTED
  }
}
