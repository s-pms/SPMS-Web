import { AirEntity } from '@airpower/base/AirEntity'
import { Field, Model, Table } from '@airpower/decorator'

@Model({
  hideFieldSelector: true,
})
export class McpToolModel extends AirEntity {
  @Field({
    label: '工具名称',
  })
  @Table({
    copyField: true,
  })
  name!: string

  @Field({
    label: '工具描述',
  })
  @Table({
    nowrap: true,
  })
  description!: string
}
