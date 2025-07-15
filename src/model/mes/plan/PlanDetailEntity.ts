import { Field, Form, Model, Table, Type } from '@airpower/web'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

@Model({
  label: '计划明细',
})
export class PlanDetailEntity extends AbstractBaseBillDetailEntity {
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
    order: -2,
  })
  @Field({
    label: '计划数量',
  })
  quantity!: number

  @Table({
    align: 'right',
    width: 150,
    order: -3,
  })
  @Field({
    label: '已完成数量',
  })
  finishQuantity!: number
}
