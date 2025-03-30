import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Field, Form, Model, Table } from '@airpower/decorator'

@Model({
  label: '领料明细',
})
export class PickingDetailEntity extends AbstractBaseBillDetailEntity {
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
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Field({
    label: '申领数量',
    type: Number,
  })
  quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已出库数量',
    type: Number,
  })
  finishQuantity!: number
}
