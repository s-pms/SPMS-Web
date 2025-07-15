import type { WebEnum } from '@airpower/web'
import { DateTimeFormatter, DateTimeType, DateTimeUtil, Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
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
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Table({
    copy: true,
    order: 88,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    order: 77,
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
    order: 66,
  })
  @Field({
    label: '生产数量',
  })
  quantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    order: 66,
  })
  @Field({
    label: '完成数量',
  })
  finishQuantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    order: 66,
    hide: true,
  })
  @Field({
    label: '异常数量',
  })
  ngQuantity!: number

  @Table({
    copy: true,
    hide: true,
  })
  @Field({
    label: '生产计划号',
  })
  planBillCode!: string

  @Table({
    width: 100,
    color: true,
  })
  @Field({
    label: '订单状态',
    dictionary: OrderStatusEnum,
  })
  status!: number

  @Table({
    width: 100,
    color: true,
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
  @Search({
    width: 120,
  })
  type!: number

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
    hide: true,
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
    hide: true,
  })
  @Field({
    label: '完成时间',
  })
  finishTime!: number

  @Field({
    label: '订单明细',
  })
  @Type(OrderDetailEntity, true)
  details: OrderDetailEntity[] = []

  @Form({})
  @Table({
    order: 44,
    hide: true,
  })
  @Field({
    label: '客户信息',
  })
  @Type(CustomerEntity)
  customer!: CustomerEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '生产工艺',
  })
  @Type(RoutingEntity)
  routing!: RoutingEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '关联计划',
  })
  @Type(PlanEntity)
  plan!: PlanEntity

  getAuditingStatus(): WebEnum {
    return OrderStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return OrderStatusEnum.PRODUCING
  }

  getRejectedStatus(): WebEnum {
    return OrderStatusEnum.REJECTED
  }
}
