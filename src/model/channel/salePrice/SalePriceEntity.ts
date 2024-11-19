import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '销售价',
})
export class SalePriceEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Field({
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: CustomerEntity,
  })
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
    type: Number,
  })
    materialId!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    width: 150,
    money: true,
    orderNumber: -1,
  })
  @Field({
    label: '销售单价',
    type: Number,
  })
    price!: number
}
