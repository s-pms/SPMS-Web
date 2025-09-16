import type { IMenu } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'

/**
 * # 菜单
 * @author Hamm.cn
 */
@Model({
  label: '菜单',
})
export class MenuEntity extends BaseEntity implements IMenu {
  /**
   * ### 菜单名称
   */
  @Table({
    force: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '菜单名称',
  })
  name!: string

  /**
   * ### 菜单路径
   */
  @Table({
    copy: true,
    force: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '菜单路径',
  })
  @Search()
  path!: string

  /**
   * ### 菜单图标
   */
  @Form()
  @Field({
    label: '菜单图标',
  })
  icon!: string

  /**
   * ### 组件地址
   */
  @Table({
    copy: true,
  })
  @Form()
  @Field({
    label: '组件地址',
  })
  @Search()
  component!: string

  /**
   * ### 排序编号
   */
  @Form({
    max: 1000,
    min: 0,
    number: true,
    filterable: true,
    requiredNumber: true,
    defaultValue: 1,
  })
  @Table({
    width: 100,
  })
  @Field({
    label: '排序编号',
  })
  orderNo!: number

  /**
   * ### 父菜单ID
   */
  @Field({
    label: '父级ID',
  })
  parentId!: number

  /**
   * ### 子菜单列表
   */
  @Field({})
  @Type(MenuEntity, true)
  children!: this[]

  /**
   * ### 父菜单
   */
  @Type(MenuEntity)
  parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare updateTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
