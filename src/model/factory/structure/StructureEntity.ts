import type { IPayload, ITree } from '@airpower/web'
import {Field, Form, Model, Search, Table, Type} from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { StructureTypeEnum } from '@/model/factory/structure/StructureTypeEnum'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'

@Model({
  label: '生产单元',
})
export class StructureEntity extends BaseEntity implements ITree, IPayload {
  @Table({
    order: 99,
    copy: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '生产单元名称',
  })
  @Search()
  name!: string

  @Table({
    width: 300,
    copy: true,
    order: 88,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '生产单元编码',
  })
  @Search()
  code!: string

  @Table({
    color: true,
    width: 120,
    order: 77,
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

  @Field({})
  @Type(StructureEntity, true)
  children!: this[]

  parentId!: number

  @Field({
    label: '所属上级',
  })
  @Type(StructureEntity)
  parent!: this

  @Field({
    label: '可执行工序',
  })
  @Type(OperationEntity, true)
  @Table({
    payload: true,
    array: true,
    order: 11,
  })
  operationList!: OperationEntity[]

  @Field({
    label: '所属部门',
  })
  @Type(DepartmentEntity, true)
  @Table({
    payload: true,
    array: true,
    order: 1,
  })
  departmentList!: DepartmentEntity[]

  getPayloadLabel(): string {
    return this.name
  }
}
