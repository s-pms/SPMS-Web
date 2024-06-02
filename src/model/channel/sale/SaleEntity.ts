import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { SaleStatusEnum } from './SaleStatusEnum'
import { SaleDetailEntity } from './SaleDetailEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AirEnum } from '@/airpower/base/AirEnum'

@Model('销售单')
export class SaleEntity extends AbstractBaseBillEntity<SaleDetailEntity> {
  @Field('销售单号') declare billCode: string

  @Table()
  @Field('客户编码') customerCode!: string

  @Table()
  @Field('客户名称') customerName!: string

  @Form({
    requiredNumber: true,
    placeholder: '请选择销售客户',
  })
  @Field('客户') customerId!: number

  @Table({
    nowrap: true,
  })
  @Form({
    textarea: true,
    maxLength: 80,
  })
  @Field('销售说明') reason!: string

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field('总金额') totalPrice!: number

  @Table({
    width: 150,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(SaleStatusEnum)
  @Field('销售状态') status!: number

  @Field('销售明细')
  @Type(SaleDetailEntity, true) details: SaleDetailEntity[] = []

  @Field('客户')
  @Type(CustomerEntity) customer!: CustomerEntity

  getAuditingStatus(): AirEnum {
    return SaleStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return SaleStatusEnum.OUTPUTING
  }

  getRejectedStatus(): AirEnum {
    return SaleStatusEnum.REJECTED
  }
}
