import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { InventoryEntity } from '../inventory/InventoryEntity'

@Model({
  label: '移库明细',
})
export class MoveDetailEntity extends AbstractBaseBillDetailEntity {
  @Field({
    type: InventoryEntity,
  })
    inventory!: InventoryEntity

  @Table({ forceShow: true })
  @Field({
    label: '物料编码',
  })
    materialCode!: string

  @Table({ forceShow: true })
  @Field({
    label: '物料名称',
  })
    materialName!: string

  @Table()
  @Field({
    label: '来源仓库',
  })
    storageName!: string

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Field({
    label: '移动数量',
  })
    quantity!: number

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Field({
    label: '已移动数量',
  })
    finishQuantity!: number
}
