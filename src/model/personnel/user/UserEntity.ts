import type { IPayload, IUser } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { UserGenderEnum } from '@/model/personnel/user/UserGenderEnum'
import { DesensitizeType, Field, Form, Search, Table, Type } from '@airpower/web'
import { RoleEntity } from '../role/RoleEntity'

/**
 * # 用户实体
 */
export class UserEntity extends BaseEntity implements IUser, IPayload {
  /**
   * ### 昵称
   */
  @Form({
    requiredString: true,
  })
  @Table({
    force: true,
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
    force: true,
    // todo
    // phone: true,
    copy: true,
    desensitize: DesensitizeType.MOBILE,
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
    force: true,
    copy: true,
    desensitize: DesensitizeType.EMAIL,
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
    force: true,
    copy: true,
    width: 100,
    hide: true,
  })
  @Search()
  @Field({
    label: '姓名',
  })
  realName!: string

  @Form({})
  @Table({
    hide: true,
    copy: true,
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
    // todo
    // payloadArray: true,
    // payloadField: 'name',
  })
  @Field({
    label: '角色',
  })
  @Type(RoleEntity, true)
  roleList!: RoleEntity[]

  @Field({
    label: '部门',
  })
  @Table({
    // todo
    // payloadArray: true,
    // payloadField: 'name',
  })
  @Type(DepartmentEntity, true)
  departmentList!: DepartmentEntity[]

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

  departmentId?: number

  /**
   * ### 设置邮箱
   * @param email 邮箱
   */
  setEmail(email: string): this {
    this.email = email
    return this
  }

  getPayloadLabel(): string {
    return this.nickname
  }
}
