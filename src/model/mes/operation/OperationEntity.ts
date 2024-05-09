import {
  Field,
  Model,
  Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 工序
 * @author Hamm
 */
@EntityConfig({
})
@Model('工序')
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
  @Type(String)
  @Field('工序名称') name!: string

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
  @Type(String)
  @Field('工序编码') code!: string
}
