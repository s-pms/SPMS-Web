import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'

@ClassName('存储资源')
@EntityConfig()
export class StorageEntity extends BaseEntity implements ITree {
  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('存储资源名称') name!: string

  @TableField()
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('存储资源编码') code!: string

  // eslint-disable-next-line no-use-before-define
  @Type(StorageEntity, true) children!: this[]

  parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(StorageEntity)
  @FieldName('所属上级') parent!: this
}
