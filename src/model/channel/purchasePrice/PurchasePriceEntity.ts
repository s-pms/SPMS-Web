import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Field, Form, Model, Table } from '@airpower/decorator'
import { SupplierEntity } from '../supplier/SupplierEntity'

@Model({
  label: '采购价',
})
export class PurchasePriceEntity extends BaseEntity {
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
  @Table()
  @Field({
    type: SupplierEntity,
    label: '供应商',
  })
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
    orderNumber: -1,
  })
  @Field({
    label: '采购单价',
    type: Number,
  })
  price!: number
}
