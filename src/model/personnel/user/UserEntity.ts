import {
  Field, Form, Search, Table,
} from '@/airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { IUser } from '@/airpower/interface/IUser'
import { AirDesensitizeType } from '@/airpower/enum/AirDesensitizeType'
import { UserGenderEnum } from '@/model/personnel/user/UserGenderEnum'

/**
 * # 用户实体
 */
export class UserEntity extends BaseEntity implements IUser {
  /**
   * ### 昵称
   */
  @Form({
    requiredString: true,
  })
  @Table({
    forceShow: true,
  })
  @Search()
  @Field({
    label: '昵称',
  })
    nickname!: string

  /**
   * ### 手机
   */
  @Form({
    mobilePhone: true,
    requiredString: true,
    defaultValue: '13888888888',
  })
  @Table({
    forceShow: true,
    phone: true,
    copyField: true,
    desensitize: AirDesensitizeType.MOBILE,
  })
  @Search()
  @Field({
    label: '手机',
  })
    phone!: string

  /**
   * ### 邮箱
   */
  @Form({
    email: true,
    requiredString: true,
  })
  @Table({
    forceShow: true,
    copyField: true,
    desensitize: AirDesensitizeType.EMAIL,
  })
  @Search()
  @Field({
    label: '邮箱',
  })
    email!: string

  @Form({
    mobilePhone: true,
    requiredString: true,
    defaultValue: '13888888888',
  })
  @Table({
    forceShow: true,
    copyField: true,
    width: 100,
  })
  @Search()
  @Field({
    label: '姓名',
  })
    realName!: string

  @Form({})
  @Table({
    forceShow: true,
    copyField: true,
    width: 200,
  })
  @Search()
  @Field({
    label: '身份证号',
  })
    idCard!: string

  /**
   * ### 头像
   */
  @Field({
    label: '头像',
  })
    avatar!: string

  /**
   * ### 密码
   */
  @Form({
    password: true,
  })
  @Field({
    label: '密码',
  })
    password!: string

  /**
   * ### 角色列表
   */
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
  @Field({
    type: RoleEntity,
    array: true,
    label: '角色',
  }) roleList!: RoleEntity[]

  @Field({
    label: '性别',
    dictionary: UserGenderEnum,
  })
  @Form({
    defaultValue: UserGenderEnum.FEMALE.key,
    clearable: false,
    radio: true,
  })
    gender!: number

  @Table({
    removed: false,
  })
  declare isDisabled: boolean

  /**
   * ### 验证码
   */
  code!: string

  /**
   * ### 所属应用AppKey
   */
  appKey!: string

  /**
   * ### 旧密码
   */
  oldPassword!: string

  @Form({
    textarea: true,
    maxLength: 100,
  })
  @Field({
    label: '个人签名',
  })
    bio!: string

  /**
   * ### 设置邮箱
   * @param email 邮箱
   * @returns
   */
  setEmail(email: string): this {
    this.email = email
    return this
  }
}
