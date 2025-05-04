import { Field, Transformer } from '@airpower/web'

/**
 * # 编码规则表格
 *
 * @author Hamm.cn
 */
export class CodeRuleField extends Transformer {
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
  })
  key!: number
}
