import type { IFile } from '@airpower/web'
import { Field, Model, Table } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'

@Model({
  label: '合同附件',
})
export class ContractDocumentEntity extends BaseEntity implements IFile {
  @Field({
    label: '附件名称',
  })
  @Table()
  name!: string

  @Field({
    label: '附件地址',
  })
  @Table()
  url!: string

  @Field({
    label: '附件大小',
  })
  @Table()
  size!: number
}
