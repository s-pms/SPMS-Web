import {
  Field,
  Model, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { IMenu } from '@/airpower/interface/IMenu'
import { OrderNumberDictionary } from '@/model/common/OrderNumberDictionary'

/**
 * # 菜单
 * @author Hamm
 */
@EntityConfig()
@Model('菜单')
export class MenuEntity extends BaseEntity implements IMenu {
  /**
   * # 菜单名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Field('菜单名称') name!: string

  /**
   * # 菜单路径
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Field('菜单路径') path!: string

  /**
   * # 菜单图标
   */
  @Form()
  @Type(String)
  @Field('菜单图标') icon!: string

  /**
   * # 组件地址
   */
  @Table({
    copyField: true,
  })
  @Form()
  @Type(String)
  @Field('组件地址') component!: string

  /**
   * # 排序编号
   */
  @Form({
    dictionary: OrderNumberDictionary,
    filterable: true,
    requiredNumber: true,
    defaultValue: 1,
  })
  @Table({
    width: 100,
  })
  @Type(Number)
  @Field('排序编号') orderNo!: number

  /**
   * # 父菜单ID
   */
  @Field('父级ID') parentId!: number

  /**
   * # 子菜单列表
   */
  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity, true) children!: this[]

  /**
   * # 父菜单
   */
  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity) parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
