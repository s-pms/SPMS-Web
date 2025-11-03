import type { IPayload, IUser } from '@airpower/web'
import { DesensitizeType, Field, Form, Search, Table, Type } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { UserGenderEnum } from '@/model/personnel/user/UserGenderEnum'

/**
 * # 用户实体
 */
export class UserEntity extends BaseEntity implements IUser, IPayload {
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

  @Form({
    mobilePhone: true,
    requiredString: true,
    defaultValue: '13888888888',
  })
  @Table({
    force: true,
    phone: true,
    copy: true,
    desensitize: DesensitizeType.MOBILE,
  })
  @Search()
  @Field({
    label: '手机',
  })
  phone!: string

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

  @Field({
    label: '头像',
  })
  avatar!: string

  @Form({
    password: true,
  })
  @Field({
    label: '密码',
  })
  password!: string

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
  @Search({
    hide: false,
  })
  declare isDisabled: boolean

  code!: string

  appKey!: string

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

  @Type(RoleEntity, true)
  roleList!: RoleEntity[]

  @Type(DepartmentEntity, true)
  departmentList!: DepartmentEntity[]

  getPayloadLabel(): string {
    return this.nickname
  }
}
