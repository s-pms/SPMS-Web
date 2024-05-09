import {
  Field, Model,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

@Model('计量单位')
export class UnitEntity extends BaseEntity {
  /**
   * # 单位名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('单位名称') name!: string

  /**
   * # 单位编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('单位编码') code!: string
}
