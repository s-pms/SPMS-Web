import {AbstractBaseBillEntity} from '@/base/bill/AbstractBaseBillEntity'
import {PurchaseEntity} from '@/model/channel/purchase/PurchaseEntity'
import {StorageEntity} from '@/model/factory/storage/StorageEntity'
import {OrderEntity} from '@/model/mes/order/OrderEntity'
import type {WebEnum} from '@airpower/web'
import {Field, Form, Model, Search, Table, Type} from '@airpower/web'
import {MoveEntity} from '../move/MoveEntity'
import {InputDetailEntity} from './InputDetailEntity'
import {InputStatusEnum} from './InputStatusEnum'
import {InputTypeEnum} from './InputTypeEnum'

@Model({
  label: '入库单',
})
export class InputEntity extends AbstractBaseBillEntity<InputDetailEntity> {
  @Field({
    label: '入库单号',
  })
  declare billCode: string

  @Table({
    width: 100,
    color: true,
    force: true,
  })
  @Form({
    defaultValue: InputTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Search({
    width: 120,
  })
  @Field({
    label: '入库类型',
    dictionary: InputTypeEnum,
  })
  type!: number

  @Table({
    width: 100,
    color: true,
    order: -80,
    force: true,
  })
  @Field({
    label: '入库状态',
    dictionary: InputStatusEnum,
  })
  status!: number

  @Field({
    label: '仓库',
  })
  @Type(StorageEntity)
  storage!: StorageEntity

  @Field({
    label: '入库明细',
  })
  @Type(InputDetailEntity, true)
  details: InputDetailEntity[] = []

  @Field({
    label: '采购单',
  })
  @Type(PurchaseEntity)
  purchase!: PurchaseEntity

  @Field({
    label: '移库单',
  })
  @Type(MoveEntity)
  move!: MoveEntity

  @Field({
    label: '生产订单',
  })
  @Type(OrderEntity)
  order!: OrderEntity

  getAuditingStatus(): WebEnum {
    return InputStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return InputStatusEnum.INPUTTING
  }

  getRejectedStatus(): WebEnum {
    return InputStatusEnum.REJECTED
  }
}
