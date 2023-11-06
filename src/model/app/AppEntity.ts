import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

@EntityConfig({
  hideFieldSelector: true,
})
@ClassName('应用')
export class AppEntity extends BaseEntity {
  /**
   * # 应用Key
   */
  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('AppKey') appKey!: string

  /**
   * # 应用名称
   */
  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('应用名称') appName!: string

  /**
   * # 应用秘钥
   */
  @FieldName('应用秘钥') appSecret!: string

  /**
   * # 应用URL
   */
  @TableField()
  @FormField({
    requiredString: true,
    placeholder: '带协议头,无需/结尾',
  })
  @FieldName('应用地址') url!: string
}
