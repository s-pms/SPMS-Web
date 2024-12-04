import { BaseEntity } from '@/base/BaseEntity'

import { SerialNumberUpdateEnum } from './SerialNumberUpdateEnum'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 编码规则实体
 *
 * @author Hamm
 */
@Model({
  permissionPrefix: 'coderule_',
  label: '编码规则',
})
export class CodeRuleEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    forceShow: true,
  })
  @Field({
    label: '编码所属字段',
  })
    ruleField!: number

  @Form({
    maxLength: 10,
    minLength: 1,
    requiredString: true,
    defaultValue: '',
  })
  @Table({
    forceShow: true,
  })
  @Field({
    label: '规则前缀',
  })
    prefix!: string

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
  @Field({
    label: '序列号初始长度',
  })
    snLength!: number

  @Table({
    forceShow: true,
  })
  @Form({
    defaultValue: '',
    clearable: true,
    maxLength: 64,
  })
  @Field({
    label: '规则模板',
  })
    template!: string

  @Form({
    clearable: false,
    defaultValue: SerialNumberUpdateEnum.DAY.key,
    requiredNumber: true,
  })
  @Table({
    showColor: true,
    width: 100,
    forceShow: true,
  })
  @Field({
    label: '序列号更新',
    dictionary: SerialNumberUpdateEnum,
  })
    snType!: number

  @Table()
  @Field({
    label: '下一个编码',
  })
    nextCode!: string

  @Field({
    type: Number,
  })
    currentSn!: number
}
