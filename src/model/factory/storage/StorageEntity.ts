import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'
import { ISelector } from '@/airpower/interface/ISelector'

@Model('存储资源')
export class StorageEntity extends BaseEntity implements ITree, ISelector {
  @Table()
  @Form({
    requiredString: true,
  })
  @Field('存储资源名称') name!: string

  @Table()
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('存储资源编码') code!: string

  // eslint-disable-next-line no-use-before-define
  @Type(StorageEntity, true) children!: this[]

  parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(StorageEntity)
  @Field('所属上级') parent!: this

  getSelectorLabel(): string {
    return this.name
  }
}
