import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { InputDetailEntity } from './InputDetailEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { InputStatus } from './InputStatus'
import { InputStatusDictionary } from './InputStatusDictionary'
import { InputType } from './InputType'
import { InputTypeDictionary } from './InputTypeDictionary'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { SearchField } from '@/airpower/decorator/SearchField'
import { MoveEntity } from '../move/MoveEntity'

@ClassName('入库单')
export class InputEntity extends AbstractBaseBillEntity<InputDetailEntity> {
  @TableField({
    orderNumber: 99,
    forceShow: true,
  })
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @SearchField()
  @FieldName('入库单号') billCode!: string

  @TableField({
    width: 100,
    showColor: true,
    forceShow: true,
  })
  @FormField({
    defaultValue: InputType.NORMAL,
    clearable: false,
    requiredNumber: true,
  })
  @SearchField()
  @Dictionary(InputTypeDictionary)
  @FieldName('入库类型') type!: InputType

  @TableField({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @SearchField()
  @Dictionary(InputStatusDictionary)
  @FieldName('入库状态') status!: InputStatus

  @FieldName('存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @FieldName('入库明细')
  @Type(InputDetailEntity, true) details: InputDetailEntity[] = []

  @FieldName('采购单')
  @Type(PurchaseEntity) purchase!: PurchaseEntity

  @FieldName('移库单')
  @Type(MoveEntity) move!: MoveEntity
}
