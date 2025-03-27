import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { ITree } from '@airpower/interface/ITree'
import { IPayload } from '@airpower/interface/IPayload'
import { BaseEntity } from '@/base/BaseEntity'

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
    copyField: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '仓库编码',
  })
    code!: string

  @Field({
    // eslint-disable-next-line no-use-before-define
    type: StorageEntity,
    array: true,
  })
    children!: this[]

  parentId!: number

  @Field({
    label: '所属上级',
    // eslint-disable-next-line no-use-before-define
    type: StorageEntity,
  })
    parent!: this

  getPayloadLabel(): string {
    return this.name
  }
}
