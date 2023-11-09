import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { PurchaseStatus } from './PurchaseStatus'
import { PurchaseStatusDictionary } from './PurchaseStatusDictionary'
import { PurchaseDetailEntity } from './PurchaseDetailEntity'

@ClassName('采购单')
export class PurchaseEntity extends BaseEntity {
  @TableField()
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @FieldName('采购单号') billCode!: string

  @TableField({
    nowrap: true,
  })
  @FormField({
    textarea: true,
    maxLength: 80,
    minLength: 5,
    requiredString: true,
  })
  @FieldName('采购事由') reason!: string

  @TableField({
    width: 100,
    suffixText: '元',
    align: 'right',
  })
  @FieldName('总金额') totalPrice!: number

  @TableField({
    width: 100,
    showColor: true,
  })
  @Dictionary(PurchaseStatusDictionary)
  @FieldName('采购状态') status!: PurchaseStatus

  @FieldName('采购明细')
  @Type(PurchaseDetailEntity, true) details: PurchaseDetailEntity[] = []
}
