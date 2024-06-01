import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { InputDetailEntity } from './InputDetailEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { InputStatusEnum } from './InputStatusEnum'
import { InputTypeEnum } from './InputTypeEnum'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { MoveEntity } from '../move/MoveEntity'

@Model('入库单')
export class InputEntity extends AbstractBaseBillEntity<InputDetailEntity> {
  @Field('入库单号') declare billCode: string

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
  @Dictionary(InputTypeEnum)
  @Field('入库类型') type!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Dictionary(InputStatusEnum)
  @Field('入库状态') status!: number

  @Field('存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @Field('入库明细')
  @Type(InputDetailEntity, true) details: InputDetailEntity[] = []

  @Field('采购单')
  @Type(PurchaseEntity) purchase!: PurchaseEntity

  @Field('移库单')
  @Type(MoveEntity) move!: MoveEntity
}
