import { AirModel } from '@airpower/base/AirModel'
import { Field } from '@airpower/decorator'

/**
 * # 编码规则表格
 *
 * @author Hamm.cn
 */
export class CodeRuleField extends AirModel {
  @Field({
    label: '默认前缀',
  })
    defaultPrefix!: string

  @Field({
    label: '编码字段名称',
  })
    label!: string

  @Field({
    label: '表格ID',
    type: Number,
  })
    key!: number
}
