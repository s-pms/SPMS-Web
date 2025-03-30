import { BaseEntity } from '@/base/BaseEntity'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'

/**
 * # 工序
 * @author Hamm.cn
 */
@Model({
  label: '工序',
})
export class OperationEntity extends BaseEntity {
  /**
   * ### 工序名称
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
   * ### 工序编码
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
