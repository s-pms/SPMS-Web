import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'
import { SupplierEntity } from '../supplier/SupplierEntity'

@Model({
  label: '采购价',
})
export class PurchasePriceEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Form({
    requiredPayload: true,
  })
  @Table()
  @Field({
    label: '供应商',
  })
  @Type(SupplierEntity)
  supplier!: SupplierEntity

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
    label: '供应商名称',
  })
  supplierName!: string

  @Table()
  @Field({
    label: '供应商编码',
  })
  supplierCode!: string

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
    label: '采购单价',
  })
  price!: number
}
