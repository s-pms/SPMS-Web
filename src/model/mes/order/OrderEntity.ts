import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
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

@ClassName('生产订单')
export class OrderEntity extends AbstractBaseBillEntity<OrderDetailEntity> {
  @TableField({
    copyField: true,
    orderNumber: 99,
  })
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @FieldName('生产订单号') billCode!: string

  @FormField({
    requiredPayload: true,
  })
  @Type(MaterialEntity) material!: MaterialEntity

  @TableField({
    copyField: true,
  })
  @FieldName('物料编码') materialCode!: string

  @TableField()
  @FieldName('物料名称') materialName!: string

  @FieldName('生产数量')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Type(Number) quantity!: number

  @TableField({
    copyField: true,
    hide: true,
  })
  @FieldName('客户编码') customerCode!: string

  @TableField({
    hide: true,
  })
  @FieldName('客户名称') customerName!: string

  @TableField({
    copyField: true,
    hide: true,
  })
  @FieldName('生产计划号') planBillCode!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料')
  @Type(Number) materialId!: number

  @TableField({
    width: 100,
    showColor: true,
  })
  @Dictionary(OrderStatusDictionary)
  @FieldName('订单状态') status!: OrderStatus

  @TableField({
    width: 100,
    showColor: true,
  })
  @FormField({
    defaultValue: OrderType.OTHER,
    clearable: false,
    requiredNumber: true,
  })
  @Dictionary(OrderTypeDictionary)
  @FieldName('订单类型') type!: OrderType

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FormField({
    defaultValue: AirDateTime.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FieldName('开始时间') startTime!: number

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FormField({
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FieldName('交付时间') deliverTime!: number

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
    hide: true,
  })
  @FieldName('完成时间') finishTime!: number

  @FieldName('订单明细')
  @Type(OrderDetailEntity, true) details: OrderDetailEntity[] = []

  @Type(CustomerEntity)
  @FormField({
    requiredPayload: true,
  })
  @FieldName('客户信息') customer!: CustomerEntity

  @Type(PlanEntity)
  @FormField({
    requiredPayload: true,
  })
  @FieldName('关联计划') plan!: PlanEntity
}
