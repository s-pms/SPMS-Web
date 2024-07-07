import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'

@Model('采购价')
export class PurchasePriceEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity) material!: MaterialEntity

  @Form({
    requiredPayload: true,
  })
  @Type(SupplierEntity) supplier!: SupplierEntity

  @Table()
  @Field('物料编码') materialCode!: string

  @Table()
  @Field('物料名称') materialName!: string

  @Table()
  @Field('供应商名称') supplierName!: string

  @Table()
  @Field('供应商编码') supplierCode!: string

  @Field('采购单价')
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
