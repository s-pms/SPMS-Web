import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { PermissionSystemEnum } from './PermissionSystemEnum'

/**
 * # 权限
 * @author Hamm
 */
@EntityConfig()
@Model('权限')
export class PermissionEntity extends BaseEntity implements ITree {
  /**
   * # 权限名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Field('权限名称') name!: string

  /**
   * # 权限唯一标识
   */
  @Table({
    forceShow: true,
    copyField: true,
  })
  @Form({
    requiredString: '请输入权限标识...',
  })
  @Field('权限标识') identity!: string

  /**
   * # 权限类别
   */
  @Dictionary(PermissionSystemEnum)
  @Table({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @Field('类别') isSystem!: boolean

  /**
   * # 父权限ID
   */
  @Field('父级ID') parentId!: number

  /**
   * # 子权限列表
   */
  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity, true) children!: this[]

  /**
   * # 父权限
   */
  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity) parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
