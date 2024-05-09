import { AirModel } from '@/airpower/base/AirModel'
import { Field, Type } from '@/airpower/decorator/Custom'

/**
 * # 编码规则表格
 *
 * @author Hamm
 */
export class CodeRuleField extends AirModel {
  @Field('默认前缀') defaultPrefix!: string

  @Field('编码字段名称') label!: string

  @Type(Number)
  @Field('表格ID') key!: number
}
