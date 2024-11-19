import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 工序
 * @author Hamm
 */
@Model({
  label: '工序',
})
export class OperationEntity extends BaseEntity {
  /**
   * # 工序名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '工序名称',
    type: String,
  })
    name!: string

  /**
   * # 工序编码
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '工序编码',
    type: String,
  })
    code!: string
}
