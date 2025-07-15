import { Field, Form, Model, Search, Table } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { BooleanYesNoDictionary } from '@/model/common/BooleanYesNoDictionary'
import { OpenAppArithmeticEnum } from './OpenAppArithmeticEnum'

@Model({
  label: '应用',
})
export class OpenAppEntity extends BaseEntity {
  @Table({
    force: true,
    order: 99,
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
    color: true,
    width: 80,
    order: 98,
  })
  @Form({
    defaultValue: BooleanYesNoDictionary.NO.key,
    clearable: false,
  })
  @Field({
    label: '内部应用',
    dictionary: BooleanYesNoDictionary,
  })
  isInternal!: boolean

  @Table({
    force: true,
    order: 98,
    width: 400,
    copy: true,
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
    width: 80,
    copy: true,
    force: true,
    color: true,
  })
  @Form({
    requiredNumber: true,
    defaultValue: OpenAppArithmeticEnum.NO.key,
    clearable: false,
    color: true,
  })
  @Search({
    width: 120,
  })
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

  @Field({
    label: 'IP白名单',
  })
  @Form({
    textarea: true,
    defaultValue: '',
    placeholder: '请输入IP白名单，一行一个，不填写则不验证',
  })
  ipWhiteList!: string
}
