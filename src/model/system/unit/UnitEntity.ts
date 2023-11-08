import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'

@ClassName('计量单位')
export class UnitEntity extends BaseEntity {
  /**
   * # 单位名称
   */
  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('单位名称') name!: string

  /**
   * # 单位编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('单位编码') code!: string
}
