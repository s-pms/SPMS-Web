import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { OutputDetailEntity } from './OutputDetailEntity'
import { OutputTypeEnum } from './OutputTypeEnum'
import { OutputStatusEnum } from './OutputStatusEnum'
import { MoveEntity } from '../move/MoveEntity'

@Model('出库单')
export class OutputEntity extends AbstractBaseBillEntity<OutputDetailEntity> {
  @Field('出库单号') declare billCode: string

  @Table({
    width: 100,
    showColor: true,
    forceShow: true,
  })
  @Form({
    defaultValue: OutputTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Search()
  @Dictionary(OutputTypeEnum)
  @Field('出库类型') type!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Dictionary(OutputStatusEnum)
  @Field('出库状态') status!: number

  @Field('出库明细')
  @Type(OutputDetailEntity, true) details: OutputDetailEntity[] = []

  @Field('采购单')
  @Type(SaleEntity) sale!: SaleEntity

  @Field('移库单')
  @Type(MoveEntity) move!: MoveEntity
}
