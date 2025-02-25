import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'
import { IPayload } from '@/airpower/interface/IPayload'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { StructureTypeEnum } from '@/model/factory/structure/StructureTypeEnum'

@Model({
  label: '生产单元',
})
export class StructureEntity extends BaseEntity implements ITree, IPayload {
  @Table()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '生产单元名称',
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
    label: '生产单元编码',
  })
    code!: string

  @Table({
    showColor: true,
    width: 120,
  })
  @Form({
    clearable: false,
    defaultValue: StructureTypeEnum.SINGLE_STATION.key,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '生产单元类型',
    dictionary: StructureTypeEnum,
  })
    type!: number

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

  getPayloadLabel(): string {
    return this.name
  }
}
