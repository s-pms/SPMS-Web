import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { OutputDetailEntity } from './OutputDetailEntity'
import { OutputTypeDictionary } from './OutputTypeDictionary'
import { OutputType } from './OutputType'
import { OutputStatusDictionary } from './OutputStatusDictionary'
import { OutputStatus } from './OutputStatus'
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
    defaultValue: OutputType.NORMAL,
    clearable: false,
    requiredNumber: true,
  })
  @Search()
  @Dictionary(OutputTypeDictionary)
  @Field('出库类型') type!: OutputType

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Dictionary(OutputStatusDictionary)
  @Field('出库状态') status!: OutputStatus

  @Field('出库明细')
  @Type(OutputDetailEntity, true) details: OutputDetailEntity[] = []

  @Field('采购单')
  @Type(SaleEntity) sale!: SaleEntity

  @Field('移库单')
  @Type(MoveEntity) move!: MoveEntity
}
