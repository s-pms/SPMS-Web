import { BaseEntity } from '@/base/BaseEntity'
import type { ITree } from '@airpower/web'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { PermissionSystemEnum } from './PermissionSystemEnum'
import { PermissionTypeEnum } from './PermissionTypeEnum'

/**
 * # 权限
 * @author Hamm.cn
 */
@Model({
  label: '权限',
})
export class PermissionEntity extends BaseEntity implements ITree {
  /**
   * ### 权限名称
   */
  @Table({
    force: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '权限名称',
  })
  name!: string

  /**
   * ### 权限唯一标识
   */
  @Table({
    force: true,
    copy: true,
  })
  @Form({
    requiredString: '请输入权限标识...',
  })
  @Field({
    label: '权限标识',
  })
  @Search()
  identity!: string

  @Table({
    color: true,
    width: 100,
  })
  @Search()
  @Field({
    label: '权限类型',
    dictionary: PermissionTypeEnum,
  })
  type!: number

  @Table({
    color: true,
    width: 100,
    order: -100,
  })
  @Field({
    label: '系统权限',
    dictionary: PermissionSystemEnum,
  })
  isSystem!: boolean

  /**
   * ### 父权限ID
   */
  @Field({
    label: '父级ID',
  })
  parentId!: number

  /**
   * ### 子权限列表
   */
  @Field({})
  @Type(PermissionEntity, true)
  children!: this[]

  /**
   * ### 父权限
   */
  @Type(PermissionEntity)
  parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
