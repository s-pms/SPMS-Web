import { Field, Model } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

@EntityConfig({
  hideFieldSelector: true,
})
@Model('应用')
export class AppEntity extends BaseEntity {
  /**
   * # 应用Key
   */
  @Table()
  @Form({
    requiredString: true,
  })
  @Field('AppKey') appKey!: string

  /**
   * # 应用名称
   */
  @Table()
  @Form({
    requiredString: true,
  })
  @Field('应用名称') appName!: string

  /**
   * # 应用秘钥
   */
  @Field('应用秘钥') appSecret!: string

  /**
   * # 应用URL
   */
  @Table()
  @Form({
    requiredString: true,
    placeholder: '带协议头,无需/结尾',
  })
  @Field('应用地址') url!: string
}
