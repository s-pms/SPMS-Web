import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@Model({
  label: '采购明细',
})
export class PurchaseDetailEntity extends AbstractBaseBillDetailEntity {
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
    type: SupplierEntity,
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
    label: '采购数量',
    type: Number,
  })
    quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已采购数量',
    type: Number,
  })
    finishQuantity!: number
}
