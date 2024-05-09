import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeType } from '@/airpower/enum/AirDateTimeType'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { OrderStatus } from './OrderStatus'
import { OrderStatusDictionary } from './OrderStatusDictionary'
import { OrderType } from './OrderType'
import { OrderTypeDictionary } from './OrderTypeDictionary'
import { OrderDetailEntity } from './OrderDetailEntity'
import { PlanEntity } from '../plan/PlanEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('生产订单')
export class OrderEntity extends AbstractBaseBillEntity<OrderDetailEntity> {
  @Table({
    copyField: true,
    orderNumber: 99,
  })
  @Form({
    placeholder: '不填写按编码规则自动生成',
  })
  @Field('生产订单号') billCode!: string

  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity) material!: MaterialEntity

  @Table({
    copyField: true,
    orderNumber: 88,
  })
  @Field('物料编码') materialCode!: string

  @Table({
    orderNumber: 77,
  })
  @Field('物料名称') materialName!: string

  @Field('生产数量')
  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: 66,
  })
  @Type(Number) quantity!: number

  @Table({
    copyField: true,
    hide: true,
  })
  @Field('生产计划号') planBillCode!: string

  @Form({
    requiredNumber: true,
  })
  @Field('物料')
  @Type(Number) materialId!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Dictionary(OrderStatusDictionary)
  @Field('订单状态') status!: OrderStatus

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: OrderType.OTHER,
    clearable: false,
    requiredNumber: true,
  })
  @Dictionary(OrderTypeDictionary)
  @Field('订单类型') type!: OrderType

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
    hide: true,
  })
  @Field('完成时间') finishTime!: number

  @Field('订单明细')
  @Type(OrderDetailEntity, true) details: OrderDetailEntity[] = []

  @Type(CustomerEntity)
  @Form({
    requiredPayload: true,
  })
  @Table({
    orderNumber: 44,
    hide: true,
  })
  @Field('客户信息') customer!: CustomerEntity

  @Type(PlanEntity)
  @Form({
    requiredPayload: true,
  })
  @Field('关联计划') plan!: PlanEntity
}
