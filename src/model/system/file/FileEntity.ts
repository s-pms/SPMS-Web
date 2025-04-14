import type { IFile } from '@airpower/interface/IFile'
import { BaseEntity } from '@/base/BaseEntity'
import { FileCategory } from '@/model/system/file/FileCategory'
import { Field } from '@airpower/decorator'

export class FileEntity extends BaseEntity implements IFile {
  name!: string

  extension!: string

  url!: string

  @Field({
    type: FileCategory,
  })
  category!: number

  hashMd5!: string

  size!: number
}
