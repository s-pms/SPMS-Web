import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { InputDetailEntity } from './InputDetailEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { InputStatusEnum } from './InputStatusEnum'
import { InputTypeEnum } from './InputTypeEnum'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { MoveEntity } from '../move/MoveEntity'
import { AirEnum } from '@/airpower/base/AirEnum'
import { OrderEntity } from '@/model/mes/order/OrderEntity'

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
    showColor: true,
    forceShow: true,
  })
  @Form({
    defaultValue: InputTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '入库类型',
    dictionary: InputTypeEnum,
  })
    type!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Field({
    label: '入库状态',
    dictionary: InputStatusEnum,
  })
    status!: number

  @Field({
    label: '仓库',
    type: StorageEntity,
  })
    storage!: StorageEntity

  @Field({
    label: '入库明细',
    type: InputDetailEntity,
    array: true,
  })
    details: InputDetailEntity[] = []

  @Field({
    label: '采购单',
    type: PurchaseEntity,
  })
    purchase!: PurchaseEntity

  @Field({
    label: '移库单',
    type: MoveEntity,
  })
    move!: MoveEntity

  @Field({
    label: '生产订单',
    type: OrderEntity,
  })
    order!: OrderEntity

  getAuditingStatus(): AirEnum {
    return InputStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return InputStatusEnum.INPUTTING
  }

  getRejectedStatus(): AirEnum {
    return InputStatusEnum.REJECTED
  }
}
