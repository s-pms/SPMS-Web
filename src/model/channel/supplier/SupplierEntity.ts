import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'

@ClassName('供应商')
export class SupplierEntity extends BaseEntity {
  /**
   * # 供应商名称
   */
  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('供应商名称') name!: string

  /**
   * # 供应商编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('供应商编码') code!: string

  /**
   * # 联系电话
   */
  @TableField()
  @FormField({
    phone: true,
  })
  @FieldName('联系电话') phone!: string
}
