import { AirModel } from '@/airpower/base/AirModel'
import { FieldName, Type } from '@/airpower/decorator/Custom'

/**
 * # 编码规则表格
 *
 * @author Hamm
 */
export class CodeRuleTable extends AirModel {
  @FieldName('默认前缀') defaultPrefix!: string

  @FieldName('表格名称') label!: string

  @Type(Number)
  @FieldName('表格ID') value!: number

  @FieldName('表格标识') table!: string
}
