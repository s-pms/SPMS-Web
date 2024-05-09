import { Dictionary, Field, Model } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { ParameterSystemDictionary } from './ParameterSystemDictionary'
import { ParameterType } from './ParameterType'
import { ParameterTypeDictionary } from './ParameterTypeDictionary'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('采集参数')
export class ParameterEntity extends BaseEntity {
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

  @Dictionary(ParameterTypeDictionary)
  @Table({
    showColor: true,
    width: 100,
  })
  @Form({
    defaultValue: ParameterType.QUANTITY,
    clearable: false,
    requiredNumber: true,
  })
  @Field('数据类型') dataType!: ParameterType

  @Dictionary(ParameterSystemDictionary)
  @Table({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @Field('参数类别') isSystem!: boolean
}
