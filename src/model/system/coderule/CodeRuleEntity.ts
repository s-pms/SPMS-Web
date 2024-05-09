import { BaseEntity } from '@/base/BaseEntity'
import { SerialNumberType } from './SerialNumberType'
import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { SerialNumberUpdateDictionary } from './SerialNumberUpdateDictionary'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
/**
 * # 编码规则实体
 *
 * @author Hamm
 */
@Model('编码规则')
@EntityConfig({
  permissionPrefix: 'coderule_',
})
export class CodeRuleEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    forceShow: true,
  })
  @Field('编码所属字段') ruleField!: number

  @Form({
    maxLength: 10,
    minLength: 1,
    requiredString: true,
    defaultValue: '',
  })
  @Table({
    forceShow: true,
  })
  @Field('规则前缀') prefix!: string

  @Form({
    max: 10,
    min: 1,
    number: true,
    requiredNumber: true,
    defaultValue: 4,
  })
  @Table({
    width: 160,
    forceShow: true,
  })
  @Field('序列号初始长度') snLength!: number

  @Table({
    forceShow: true,
  })
  @Form({
    defaultValue: '',
    clearable: true,
    maxLength: 64,
  })
  @Field('规则模板') template!: string

  @Dictionary(SerialNumberUpdateDictionary)
  @Form({
    clearable: false,
    defaultValue: SerialNumberType.DAY,
    requiredNumber: true,
  })
  @Table({
    showColor: true,
    width: 100,
    forceShow: true,
  })
  @Field('序列号更新') snType!: SerialNumberType

  @Table()
  @Field('下一个编码') nextCode!: string

  @Type(Number) currentSn!: number
}
