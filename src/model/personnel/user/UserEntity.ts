import {
  ClassName, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { IUser } from '@/airpower/interface/IUser'

/**
 * # 用户实体
 */
@ClassName('用户')
@EntityConfig({
  addTitle: '添加用户',
})
export class UserEntity extends BaseEntity implements IUser {
  /**
   * # 邮箱
   */
  @FormField({
    email: true,
  })
  @TableField()
  @SearchField()
  @FieldName('账号') account!: string

  /**
   * # 手机
   */
  @FormField({
    mobilePhone: true,
  })
  @TableField({
    phone: true,
  })
  @SearchField()
  @FieldName('手机') phone!: string

  /**
   * # 邮箱
   */
  @FormField({
    email: true,
  })
  @TableField()
  @SearchField()
  @FieldName('邮箱') email!: string

  /**
   * # 密码
   */
  @FormField({
    password: true,
  })
  @FieldName('密码') password!: string

  /**
   * # 昵称
   */
  @FormField({
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName('昵称') nickname!: string

  /**
   * # 头像
   */
  @FieldName('头像') avatar!: string

  /**
   * # 角色列表
   */
  @FieldName('角色')
  @TableField({
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
}
