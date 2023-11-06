import { ClassName, Dictionary, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { SupplierLevel } from './SupplierLevel'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { SupplierLevelDictionary } from './SupplierLevelDictionary'

@ClassName('供应商')
export class SupplierEntity extends BaseEntity {
  /**
   * # 供应商编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
    orderNumber: 99,
  })
  @FormField({
    orderNumber: 98,
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('供应商编码') code!: string

  /**
   * # 供应商名称
   */
  @TableField({
    forceShow: true,
    orderNumber: 99,
  })
  @FormField({
    orderNumber: 98,
    requiredString: true,
  })
  @FieldName('供应商名称') name!: string

  /**
   * # 供应商级别
   */
  @Dictionary(SupplierLevelDictionary)
  @TableField({
    showColor: true,
  })
  @FormField({
    requiredNumber: true,
    defaultValue: SupplierLevel.GOLD,
  })
  @FieldName('供应商级别') level!: SupplierLevel

  /**
   * # 联系电话
   */
  @TableField()
  @FormField({
    mobilePhone: true,
  })
  @FieldName('联系电话') phone!: string
}
