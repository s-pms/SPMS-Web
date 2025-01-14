import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { PermissionSystemEnum } from './PermissionSystemEnum'

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
    forceShow: true,
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
    forceShow: true,
    copyField: true,
  })
  @Form({
    requiredString: '请输入权限标识...',
  })
  @Field({
    label: '权限标识',
  })
    identity!: string

  /**
   * ### 权限类别
   */
  @Table({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @Field({
    label: '类别',
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
  @Field({
    // eslint-disable-next-line no-use-before-define
    type: PermissionEntity,
    array: true,
  }) children!: this[]

  /**
   * ### 父权限
   */
  @Field({
    // eslint-disable-next-line no-use-before-define
    type: PermissionEntity,
  }) parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
