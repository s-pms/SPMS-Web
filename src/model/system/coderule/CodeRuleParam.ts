import { AirModel } from '@/airpower/base/AirModel'
import { FieldName, Type } from '@/airpower/decorator/Custom'

/**
 * # 编码规则参数
 *
 * @author Hamm
 */
export class CodeRuleParam extends AirModel {
  @FieldName('占位符') label!: string

  @Type(Number)
  @FieldName('参数值') value!: number

  @FieldName('示例') demo!: string

  @FieldName('标题') desc!: string
}
