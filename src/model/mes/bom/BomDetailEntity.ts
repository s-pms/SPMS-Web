import { Field, Form, Model, Table, Type } from '@airpower/web'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

@Model({
  label: '配方明细',
})
export class BomDetailEntity extends AbstractBaseBillDetailEntity {
  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Table({ force: true })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    force: true,
  })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Field({
    label: '所需数量',
  })
  @Table({
    align: 'right',
    width: 200,
  })
  quantity!: number

  finishQuantity!: number
}
