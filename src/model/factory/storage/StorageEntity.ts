import type { IPayload, ITree } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'

@Model({
  label: '仓库',
})
export class StorageEntity extends BaseEntity implements ITree, IPayload {
  @Table()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '仓库名称',
  })
  name!: string

  @Table({
    width: 300,
    copy: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '仓库编码',
  })
  code!: string

  @Field({})
  @Type(StorageEntity, true)
  children!: this[]

  parentId!: number

  @Field({
    label: '所属上级',
  })
  @Type(StorageEntity)
  parent!: this

  getPayloadLabel(): string {
    return this.name
  }
}
