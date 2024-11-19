import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '计划明细',
})
export class PlanDetailEntity extends AbstractBaseBillDetailEntity {
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
    suffixText: '-',
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Field({
    label: '计划数量',
    type: Number,
  })
    quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已完成数量',
    type: Number,
  })
    finishQuantity!: number
}
