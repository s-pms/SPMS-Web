import type { ITree } from '@airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'
import { OrderNumberDictionary } from '@/model/common/OrderNumberDictionary'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'

/**
 * # 部门
 * @author Hamm.cn
 */
@Model({
  label: '菜单',
  addChildPermission: 'add',
})
export class DepartmentEntity extends BaseEntity implements ITree {
  @Table({
    forceShow: true,
    orderNumber: 99,
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
    forceShow: true,
    orderNumber: 88,
    width: 300,
    copyField: true,
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
    dictionary: OrderNumberDictionary,
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
    type: Number,
  })
  parentId!: number

  @Field({

    type: DepartmentEntity,
    array: true,
  })
  children!: this[]

  @Field({

    type: DepartmentEntity,
  })
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
