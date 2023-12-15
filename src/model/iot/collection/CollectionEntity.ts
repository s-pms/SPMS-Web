import { ClassName, Dictionary, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { CollectionGranularity } from './CollectionGranularity'
import { CollectionGranularityDictionary } from './CollectionGranularityDictionary'

@ClassName('采集参数')
export class CollectionEntity extends BaseEntity {
  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('参数名称') code!: string

  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('参数标题') label!: string

  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('参数采集值') value!: string

  @FieldName('最后变更') timestamp!: number

  @FieldName('uuid') uuid!: string

  @Dictionary(CollectionGranularityDictionary)
  @FormField()
  @FieldName('颗粒度') reportGranularity!: CollectionGranularity
}
