import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { PurchaseStatus } from './PurchaseStatus'
import { PurchaseStatusDictionary } from './PurchaseStatusDictionary'
import { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { SearchField } from '@/airpower/decorator/SearchField'

@ClassName('采购单')
export class PurchaseEntity extends AbstractBaseBillEntity<PurchaseDetailEntity> {
  @TableField({
    orderNumber: 99,
    forceShow: true,
  })
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
    requiredString: true,
  })
  @FieldName('采购事由') reason!: string

  @TableField({
    width: 150,
    suffixText: '元',
    align: 'right',
    forceShow: true,
  })
  @FormField({
    suffixText: '元',
  })
  @FieldName('总金额') totalPrice!: number

  @TableField({
    width: 150,
    suffixText: '元',
    align: 'right',
    forceShow: true,
  })
  @FormField({
    suffixText: '元',
  })
  @FieldName('实际金额') totalRealPrice!: number

  @TableField({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(PurchaseStatusDictionary)
  @SearchField()
  @FieldName('采购状态') status!: PurchaseStatus

  @FieldName('采购明细')
  @Type(PurchaseDetailEntity, true) details: PurchaseDetailEntity[] = []
}
