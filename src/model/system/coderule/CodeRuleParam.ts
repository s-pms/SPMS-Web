import { AirModel } from '@/airpower/base/AirModel'
import { Field, Type } from '@/airpower/decorator/Custom'

/**
 * # 编码规则参数
 *
 * @author Hamm
 */
export class CodeRuleParam extends AirModel {
  @Field('占位符') label!: string

  @Type(Number)
  @Field('参数值') value!: number

  @Field('示例') demo!: string

  @Field('标题') desc!: string
}
