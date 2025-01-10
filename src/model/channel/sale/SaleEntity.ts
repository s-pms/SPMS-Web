import { SaleStatusEnum } from './SaleStatusEnum'
import { SaleDetailEntity } from './SaleDetailEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import {
  Field, Form, Model, Table,
} from '@/airpower/decorator'
import { AirEnum } from '@/airpower/base/AirEnum'

@Model({
  label: '销售单',
})
export class SaleEntity extends AbstractBaseBillEntity<SaleDetailEntity> {
  @Field({
    label: '销售单号',
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
    placeholder: '请选择销售客户',
  })
  @Field({
    label: '客户',
  })
    customerId!: number

  @Table({
    nowrap: true,
  })
  @Form({
    textarea: true,
    maxLength: 80,
  })
  @Field({
    label: '销售说明',
  })
    reason!: string

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field({
    label: '总金额',
  })
    totalPrice!: number

  @Table({
    width: 150,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Field({
    label: '销售状态',
    dictionary: SaleStatusEnum,
  })
    status!: number

  @Field({
    label: '销售明细',
    type: SaleDetailEntity,
    array: true,
  })
    details: SaleDetailEntity[] = []

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '客户',
    type: CustomerEntity,
  })
    customer!: CustomerEntity

  getAuditingStatus(): AirEnum {
    return SaleStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return SaleStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): AirEnum {
    return SaleStatusEnum.REJECTED
  }
}
