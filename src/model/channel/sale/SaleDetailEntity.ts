import { Field, Form, Model, Table, Type } from '@airpower/web'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'

@Model({
  label: '销售明细',
})
export class SaleDetailEntity extends AbstractBaseBillDetailEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

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
    order: -1,
  })
  @Field({
    label: '销售单价',
    type: Number,
  })
  price!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    order: -2,
  })
  @Field({
    label: '销售数量',
    type: Number,
  })
  quantity!: number

  @Field({
    type: Number,
  })
  finishQuantity!: number

  @Type(CustomerEntity)
  customer!: CustomerEntity
}
