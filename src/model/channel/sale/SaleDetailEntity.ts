import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import {
  Field, Form, Model, Table,
} from '@/airpower/decorator'

@Model({
  label: '销售明细',
})
export class SaleDetailEntity extends AbstractBaseBillDetailEntity {
  @Form({
    requiredPayload: true,
  })
  @Field({
    type: MaterialEntity,
  })
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
    orderNumber: -1,
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
    orderNumber: -2,
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

  @Field({
    type: CustomerEntity,
  })
    customer!: CustomerEntity
}
