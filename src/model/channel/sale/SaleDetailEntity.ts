import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('销售明细')
export class SaleDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @Table()
  @Field('物料编码') materialCode!: string

  @Table()
  @Field('物料名称') materialName!: string

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
    suffixText: '元',
    align: 'right',
    orderNumber: -1,
  })
  @Type(Number) price!: number

  @Field('销售数量')
  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Type(Number) quantity!: number

  @Type(Number) finishQuantity!: number

  @Type(CustomerEntity) customer!: CustomerEntity
}
