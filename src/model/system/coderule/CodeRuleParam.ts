import { AirModel } from '@airpower/base/AirModel'
import { Field } from '@airpower/decorator'

/**
 * # 编码规则参数
 *
 * @author Hamm.cn
 */
export class CodeRuleParam extends AirModel {
  @Field({
    label: '占位符',
  })
  label!: string

  @Field({
    label: '参数值',
    type: Number,
  })
  value!: number

  @Field({
    label: '示例',
  })
  demo!: string

  @Field({
    label: '标题',
  })
  desc!: string
}
