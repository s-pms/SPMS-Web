import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { SearchField } from '@/airpower/decorator/SearchField'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { OutputDetailEntity } from './OutputDetailEntity'
import { OutputTypeDictionary } from './OutputTypeDictionary'
import { OutputType } from './OutputType'
import { OutputStatusDictionary } from './OutputStatusDictionary'
import { OutputStatus } from './OutputStatus'
import { MoveEntity } from '../move/MoveEntity'

@ClassName('出库单')
export class OutputEntity extends AbstractBaseBillEntity<OutputDetailEntity> {
  @TableField({
    orderNumber: 99,
  })
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @SearchField()
  @FieldName('出库单号') billCode!: string

  @TableField({
    width: 100,
    showColor: true,
  })
  @FormField({
    defaultValue: OutputType.OTHER,
    clearable: false,
    requiredNumber: true,
  })
  @SearchField()
  @Dictionary(OutputTypeDictionary)
  @FieldName('出库类型') type!: OutputType

  @TableField({
    width: 100,
    showColor: true,
    orderNumber: -80,
  })
  @SearchField()
  @Dictionary(OutputStatusDictionary)
  @FieldName('出库状态') status!: OutputStatus

  @FieldName('出库明细')
  @Type(OutputDetailEntity, true) details: OutputDetailEntity[] = []

  @FieldName('采购单')
  @Type(SaleEntity) sale!: SaleEntity

  @FieldName('移库单')
  @Type(MoveEntity) move!: MoveEntity
}
