import {
  Field, Form, Model, Table,
} from '@/airpower/decorator'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'

@Model({
  label: '工厂结构',
})
export class StructureEntity extends BaseEntity implements ITree {
  @Table()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '工厂结构名称',
  })
    name!: string

  @Table({
    width: 300,
    copyField: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '工厂结构编码',
  })
    code!: string

  @Field({
    // eslint-disable-next-line no-use-before-define
    type: StructureEntity,
    array: true,
  })
    children!: this[]

  parentId!: number

  @Field({
    label: '所属上级',
    // eslint-disable-next-line no-use-before-define
    type: StructureEntity,
  })
    parent!: this

  @Field({
    type: OperationEntity,
    array: true,
    label: '可执行工序',
  })
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
    operationList!: OperationEntity[]
}
