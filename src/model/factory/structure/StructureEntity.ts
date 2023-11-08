import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from '@/base/BaseEntity'

@ClassName('工厂结构')
export class StructureEntity extends BaseEntity implements ITree {
  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('工厂结构名称') name!: string

  @TableField()
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('工厂结构编码') code!: string

  // eslint-disable-next-line no-use-before-define
  @Type(StructureEntity, true) children!: this[]

  parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(StructureEntity)
  @FieldName('所属上级') parent!: this
}
