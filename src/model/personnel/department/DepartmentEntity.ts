import type { IPayload, ITree } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'

/**
 * # 部门
 * @author Hamm.cn
 */
@Model({
  label: '菜单',
  addChildPermission: 'add',
  hideFieldSelector: true,
})
export class DepartmentEntity extends BaseEntity implements ITree, IPayload {
  @Table({
    force: true,
    order: 99,
    copy: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '部门名称',
  })
  name!: string

  @Table({
    force: true,
    order: 88,
    width: 300,
    copy: true,
  })
  @Search()
  @Form({
    placeholder: '如不填写,则后端自动生成...',
  })
  @Field({
    label: '部门编码',
  })
  code!: string

  @Form({
    max: 200,
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

  @Field({
    label: '父级ID',
  })
  parentId!: number

  @Field({})
  @Type(DepartmentEntity, true)
  children!: this[]

  @Type(DepartmentEntity)
  parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean

  getPayloadLabel(): string {
    return this.name
  }
}
