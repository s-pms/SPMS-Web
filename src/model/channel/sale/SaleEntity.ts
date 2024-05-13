import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { SaleStatus } from './SaleStatus'
import { SaleStatusDictionary } from './SaleStatusDictionary'
import { SaleDetailEntity } from './SaleDetailEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

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
    suffixText: '元',
    align: 'right',
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
  @Dictionary(SaleStatusDictionary)
  @Field('销售状态') status!: SaleStatus

  @Field('销售明细')
  @Type(SaleDetailEntity, true) details: SaleDetailEntity[] = []

  @Field('客户')
  @Type(CustomerEntity) customer!: CustomerEntity
}
