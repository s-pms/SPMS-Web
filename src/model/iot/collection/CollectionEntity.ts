import { Dictionary, Field, Model } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { CollectionGranularity } from './CollectionGranularity'
import { CollectionGranularityDictionary } from './CollectionGranularityDictionary'
import { ParameterType } from '../parameter/ParameterType'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('采集参数')
export class CollectionEntity extends BaseEntity {
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('参数名称') code!: string

  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('参数标题') label!: string

  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('参数采集值') value!: string

  @Field('最后变更') timestamp!: number

  @Field('uuid') uuid!: string

  @Dictionary(CollectionGranularityDictionary)
  @Form()
  @Field('颗粒度') reportGranularity!: CollectionGranularity

  intValue!: number

  booleanValue!: boolean

  strValue!: string

  startTime!: number

  endTime!: number

  dataType!: ParameterType
}
