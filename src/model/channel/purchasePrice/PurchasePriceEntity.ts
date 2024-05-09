import {
  Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'

@Model('采购价')
export class PurchasePriceEntity extends BaseEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @Type(SupplierEntity) supplier!: SupplierEntity

  @Table()
  @Field('物料编码') materialCode!: string

  @Table()
  @Field('物料名称') materialName!: string

  @Table()
  @Field('供应商名称') supplierName!: string

  @Table()
  @Field('供应商编码') supplierCode!: string

  @Form({
    requiredNumber: true,
  })
  @Field('物料')
  @Type(Number) materialId!: number

  @Form({
    requiredNumber: true,
  })
  @Field('供应商')
  @Type(Number) supplierId!: number

  @Field('采购单价')
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
}
