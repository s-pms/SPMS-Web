import type { IFile } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { FileCategory } from '@/model/system/file/FileCategory'
import { Field } from '@airpower/web'

export class FileEntity extends BaseEntity implements IFile {
  name!: string

  extension!: string

  url!: string

  @Field({
    dictionary: FileCategory,
  })
  category!: number

  hashMd5!: string

  size!: number
}
