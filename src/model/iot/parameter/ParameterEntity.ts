import { BaseEntity } from '@/base/BaseEntity'
import { ParameterSystemEnum } from '@/model/iot/parameter/ParameterSystemEnum'
import { Field, Form, Model, Table } from '@airpower/web'
import { ParameterTypeEnum } from './ParameterTypeEnum'

@Model({
  label: '采集参数',
})
export class ParameterEntity extends BaseEntity {
  @Table({
    force: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '参数名称',
  })
  code!: string

  @Table({
    force: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '参数标题',
  })
  label!: string

  @Table({
    color: true,
    width: 100,
  })
  @Form({
    defaultValue: ParameterTypeEnum.NUMBER.key,
    clearable: false,
    requiredNumber: true,
  })
  @Field({
    label: '数据类型',
    dictionary: ParameterTypeEnum,
  })
  dataType!: number

  @Table({
    color: true,
    width: 100,
    order: -100,
  })
  @Field({
    label: '参数类别',
    dictionary: ParameterSystemEnum,
  })
  isSystem!: boolean
}
