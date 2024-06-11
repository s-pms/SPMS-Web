import { Dictionary, Field, Model } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { OpenAppArithmeticEnum } from './OpenAppArithmeticEnum'
import { Search } from '@/airpower/decorator/SearchField'

@EntityConfig({
  hideFieldSelector: true,
  permissionPrefix: 'open/app_',
})
@Model('应用')
export class OpenAppEntity extends BaseEntity {
  @Table({
    forceShow: true,
    orderNumber: 99,
    width: 300,
    copyField: true,
  })
  @Search()
  @Form({})
  @Field('AppKey') appKey!: string

  @Field('AppSecret') appSecret!: string

  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field('应用名称') appName!: string

  @Dictionary(OpenAppArithmeticEnum)
  @Table({
    width: 80,
    copyField: true,
    forceShow: true,
    showColor: true,
  })
  @Form({
    requiredNumber: true,
    defaultValue: OpenAppArithmeticEnum.AES.key,
    clearable: false,
    showColor: true,
  })
  @Search()
  @Field('加密算法') arithmetic!: number

  @Table({
    removed: false,
  })
  declare isDisabled: boolean

  @Form({
    textarea: true,
    maxLength: 9999,
  })
  @Field('公钥') publicKey!:string

  @Form({
    textarea: true,
  })
  @Field('私钥') privateKey!:string

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
