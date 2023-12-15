import { ClassName, Dictionary, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { ParameterSystemDictionary } from './ParameterSystemDictionary'
import { ParameterType } from './ParameterType'
import { ParameterTypeDictionary } from './ParameterTypeDictionary'

@ClassName('采集参数')
export class ParameterEntity extends BaseEntity {
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

  @Dictionary(ParameterTypeDictionary)
  @TableField({
    showColor: true,
    width: 100,
  })
  @FormField({
    defaultValue: ParameterType.QUANTITY,
    clearable: false,
    requiredNumber: true,
  })
  @FieldName('数据类型') dataType!: ParameterType

  @Dictionary(ParameterSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('参数类别') isSystem!: boolean
}
