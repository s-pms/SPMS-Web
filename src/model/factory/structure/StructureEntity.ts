import { Field, Model, Type } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'

@Model('工厂结构')
export class StructureEntity extends BaseEntity implements ITree {
  @Table()
  @Form({
    requiredString: true,
  })
  @Field('工厂结构名称') name!: string

  @Table()
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('工厂结构编码') code!: string

  // eslint-disable-next-line no-use-before-define
  @Type(StructureEntity, true) children!: this[]

  parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(StructureEntity)
  @Field('所属上级') parent!: this
}
