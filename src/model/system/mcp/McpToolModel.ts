import { Field, RootEntity, Table } from '@airpower/web'

export class McpToolModel extends RootEntity {
  @Field({
    label: '工具名称',
  })
  @Table({
    copy: true,
  })
  name!: string

  @Field({
    label: '工具描述',
  })
  @Table({})
  description!: string

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
