import type { WebEnum } from '@airpower/web'
import { Field, Form, Model, Table, Type } from '@airpower/web'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { SaleDetailEntity } from './SaleDetailEntity'
import { SaleStatusEnum } from './SaleStatusEnum'

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
    force: true,
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
    color: true,
    order: -80,
    force: true,
  })
  @Field({
    label: '销售状态',
    dictionary: SaleStatusEnum,
  })
  status!: number

  @Field({
    label: '销售明细',
  })
  @Type(SaleDetailEntity, true)
  details: SaleDetailEntity[] = []

  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '客户',
  })
  @Type(CustomerEntity)
  customer!: CustomerEntity

  getAuditingStatus(): WebEnum {
    return SaleStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return SaleStatusEnum.OUTPUTTING
  }

  getRejectedStatus(): WebEnum {
    return SaleStatusEnum.REJECTED
  }
}
