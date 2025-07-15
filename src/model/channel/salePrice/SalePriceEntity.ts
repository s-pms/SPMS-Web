import {Field, Form, Model, Table, Type} from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'

@Model({
  label: '销售价',
})
export class SalePriceEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Form({
    requiredPayload: true,
  })
  @Type(CustomerEntity)
  customer!: CustomerEntity

  @Table()
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table()
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Table()
  @Field({
    label: '客户编码',
  })
  customerName!: string

  @Table()
  @Field({
    label: '客户名称',
  })
  customerCode!: string

  @Form({
    requiredNumber: true,
  })
  @Field({
    label: '物料',
  })
  materialId!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    width: 150,
    money: true,
    order: -1,
  })
  @Field({
    label: '销售单价',
  })
  price!: number
}
