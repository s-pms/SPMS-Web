import { Field, Form, Model, Search, Table } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { SerialNumberUpdateEnum } from '@/model/system/coderule/SerialNumberUpdateEnum'

/**
 * # 编码规则实体
 *
 * @author Hamm.cn
 */
@Model({
  permissionPrefix: 'CodeRule',
  label: '编码规则',
})
export class CodeRuleEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    force: true,
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
    force: true,
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
    force: true,
  })
  @Field({
    label: '序列号初始长度',
  })
  snLength!: number

  @Table({
    force: true,
  })
  @Form({
    defaultValue: '',
    clearable: true,
    maxLength: 64,
  })
  @Field({
    label: '规则模板',
  })
  @Search()
  template!: string

  @Form({
    clearable: false,
    defaultValue: SerialNumberUpdateEnum.DAY.key,
    requiredNumber: true,
  })
  @Table({
    color: true,
    width: 100,
    force: true,
  })
  @Field({
    label: '序列号更新',
    dictionary: SerialNumberUpdateEnum,
  })
  @Search({
    width: 130,
  })
  snType!: number

  @Table()
  @Field({
    label: '下一个编码',
  })
  nextCode!: string

  currentSn!: number
}
