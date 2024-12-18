import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { IUser } from '@/airpower/interface/IUser'
import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'

/**
 * # 用户实体
 */
@Model({
  label: '用户',
  addTitle: '添加用户',
})
export class UserEntity extends BaseEntity implements IUser {
  /**
   * ### 账号
   */
  @Form({
    requiredString: true,
  })
  @Table()
  @Search()
  @Field({
    label: '账号',
  })
    account!: string

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
  })
  @Table({
    phone: true,
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
  })
  @Table()
  @Search()
  @Field({
    label: '邮箱',
  })
    email!: string

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
   * ### 头像
   */
  @Field({
    label: '头像',
  })
    avatar!: string

  /**
   * ### 角色列表
   */
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
  @Field({
    label: '角色',
    type: RoleEntity,
    array: true,
  })
    roleList!: RoleEntity[]

  /**
   * ### 验证码
   */
  code!: string

  /**
   * ### 所属应用AppKey
   */
  appKey!: string

  /**
   * ### 是否超级管理员
   * @returns 是否超管
   */
  isRootUser() {
    return this.id === 1
  }
}
