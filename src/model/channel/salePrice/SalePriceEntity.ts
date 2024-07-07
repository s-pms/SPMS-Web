import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('销售价')
export class SalePriceEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity) material!: MaterialEntity

  @Form({
    requiredPayload: true,
  })
  @Type(CustomerEntity) customer!: CustomerEntity

  @Table()
  @Field('物料编码') materialCode!: string

  @Table()
  @Field('物料名称') materialName!: string

  @Table()
  @Field('客户编码') customerName!: string

  @Table()
  @Field('客户名称') customerCode!: string

  @Form({
    requiredNumber: true,
  })
  @Field('物料')
  @Type(Number) materialId!: number

  @Field('销售单价')
  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    width: 150,
    money: true,
    orderNumber: -1,
  })
  @Type(Number) price!: number
}
