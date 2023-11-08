import { BaseEntity } from '@/base/BaseEntity'
import { SerialNumberType } from './SerialNumberType'
import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { SerialNumberUpdateDictionary } from './SerialNumberUpdateDictionary'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
/**
 * # 编码规则实体
 *
 * @author Hamm
 */
@ClassName('编码规则')
@EntityConfig({
  permissionPrefix: 'coderule_',
})
export class CodeRuleEntity extends BaseEntity {
  @FormField({
    requiredNumber: true,
  })
  @TableField()
  @FieldName('编码所属字段') ruleField!: number

  @FormField({
    maxLength: 10,
    minLength: 1,
    requiredString: true,
    defaultValue: '',
  })
  @TableField()
  @FieldName('规则前缀') prefix!: string

  @FormField({
    max: 10,
    min: 1,
    number: true,
    requiredNumber: true,
    defaultValue: 4,
  })
  @TableField({
    width: 160,
  })
  @FieldName('序列号初始长度') snLength!: number

  @TableField()
  @FormField({
    defaultValue: '',
    clearable: true,
    maxLength: 64,
  })
  @FieldName('规则模板') template!: string

  @Dictionary(SerialNumberUpdateDictionary)
  @FormField({
    clearable: false,
    defaultValue: SerialNumberType.DAY,
    requiredNumber: true,
  })
  @TableField({
    showColor: true,
    width: 100,
  })
  @FieldName('序列号更新') snType!: SerialNumberType

  @TableField()
  @FieldName('下一个编码') nextCode!: string

  @Type(Number) currentSn!: number
}
