import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { OpenAppArithmeticEnum } from './OpenAppArithmeticEnum'
import { Search } from '@/airpower/decorator/SearchField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  hideFieldSelector: true,
  label: '应用',
})
export class OpenAppEntity extends BaseEntity {
  @Table({
    forceShow: true,
    orderNumber: 99,
    width: 300,
    copyField: true,
  })
  @Search()
  @Form({})
  @Field({
    label: 'AppKey',
  })
    appKey!: string

  @Field({
    label: 'AppSecret',
  })
    appSecret!: string

  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '应用名称',
  })
    appName!: string

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
  @Field({
    label: '加密算法',
    dictionary: OpenAppArithmeticEnum,
  })
    arithmetic!: number

  @Table({
    removed: false,
  })
  declare isDisabled: boolean

  @Form({
    textarea: true,
    maxLength: 9999,
  })
  @Field({
    label: '公钥',
  })
    publicKey!: string

  @Form({
    textarea: true,
  })
  @Field({
    label: '私钥',
  })
    privateKey!: string

  /**
   * ### 应用URL
   */
  @Table()
  @Form({
    requiredString: true,
    placeholder: '带协议头,无需/结尾',
  })
  @Field({
    label: '应用地址',
  })
    url!: string

  @Form({
    textarea: true,
    defaultValue: '',
    placeholder: '请输入IP白名单，一行一个',
  })
  @Field({
    label: 'IP白名单',
    type: String,
  })
    ipWhiteList!: string
}
