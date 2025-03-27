import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { ParameterTypeEnum } from './ParameterTypeEnum'
import { ParameterSystemEnum } from '@/model/iot/parameter/ParameterSystemEnum'

@Model({
  label: '采集参数',
})
export class ParameterEntity extends BaseEntity {
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '参数名称',
  })
    code!: string

  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '参数标题',
  })
    label!: string

  @Table({
    showColor: true,
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
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @Field({
    label: '参数类别',
    dictionary: ParameterSystemEnum,
  })
    isSystem!: boolean
}
