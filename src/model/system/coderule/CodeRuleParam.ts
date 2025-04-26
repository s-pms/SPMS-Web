import { Field, RootModel } from '@airpower/web'

/**
 * # 编码规则参数
 *
 * @author Hamm.cn
 */
export class CodeRuleParam extends RootModel {
  @Field({
    label: '占位符',
  })
  label!: string

  @Field({
    label: '参数值',
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
