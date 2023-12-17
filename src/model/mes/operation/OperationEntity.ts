import {
  ClassName,
  FieldName, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 工序
 * @author Hamm
 */
@EntityConfig({
})
@ClassName('工序')
export class OperationEntity extends BaseEntity {
  /**
   * # 工序名称
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('工序名称') name!: string

  /**
   * # 工序编码
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    placeholder: '不填按编码规则自动生成',
  })
  @Type(String)
  @FieldName('工序编码') code!: string
}
