import { BaseEntity } from '@/base/BaseEntity'
import { SerialNumberType } from './SerialNumberType'
import {
  ClassName, Dictionary, FieldName,
} from '@/airpower/decorator/Custom'
import { SerialNumberUpdateDictionary } from './SerialNumberUpdateDictionary'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
/**
 * # 编码规则实体
 *
 * @author Hamm
 */
@ClassName('编码规则')
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
    min: 4,
    number: true,
    requiredNumber: true,
    defaultValue: 4,
  })
  @TableField()
  @FieldName('序列号初始长度') snLength!: number

  @TableField()
  @FormField({
    defaultValue: '',
    requiredString: true,
    clearable: true,
    maxLength: 32,
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
  })
  @FieldName('序列号更新') snType!: SerialNumberType
}
