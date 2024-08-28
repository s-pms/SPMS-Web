/* eslint-disable */
import {Field, Model, Type} from '@/airpower/decorator/Custom'
import {BaseEntity} from '@/base/BaseEntity'
import {RoleEntity} from '../role/RoleEntity'
import {EntityConfig} from '@/airpower/decorator/EntityConfig'
import {IUser} from '@/airpower/interface/IUser'
import {Form} from '@/airpower/decorator/FormField'
import {Search} from '@/airpower/decorator/SearchField'
import {Table} from '@/airpower/decorator/TableField'

/**
 * # 用户实体
 */
@Model('用户')
@EntityConfig({
  addTitle: '添加用户',
})
export class UserEntity extends BaseEntity implements IUser {
  /**
   * # 账号
   */
  @Form({
    requiredString: true,
  })
  @Table()
  @Search()
  @Field('账号') account!: string

  /**
   * # 昵称
   */
  @Form({
    requiredString: true,
  })
  @Table({
    forceShow: true,
  })
  @Search()
  @Field('昵称') nickname!: string

  /**
   * # 手机
   */
  @Form({
    mobilePhone: true,
  })
  @Table({
    phone: true,
  })
  @Search()
  @Field('手机') phone!: string

  /**
   * # 邮箱
   */
  @Form({
    email: true,
  })
  @Table()
  @Search()
  @Field('邮箱') email!: string

  /**
   * # 密码
   */
  @Form({
    password: true,
  })
  @Field('密码') password!: string

  /**
   * # 头像
   */
  @Field('头像') avatar!: string

  /**
   * # 角色列表
   */
  @Field('角色')
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
  @Type(RoleEntity, true) roleList!: RoleEntity[]

  /**
   * # 是否超级管理员
   * @returns 是否超管
   */
  isRootUser() {
    return this.id === 1
  }


  /**
   * # 验证码
   */
  code!: string

  /**
   * # 所属应用AppKey
   */
  appKey!: string
}
