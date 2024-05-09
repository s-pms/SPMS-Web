import {
  Field, Model,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { ISelector } from '@/airpower/interface/ISelector'

@Model('客户')
export class CustomerEntity extends BaseEntity implements ISelector {
  getSelectorLabel(): string {
    return this.name
  }

  /**
   * # 客户名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('客户名称') name!: string

  /**
   * # 客户编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('客户编码') code!: string

  /**
   * # 联系电话
   */
  @Table()
  @Form({
    phone: true,
  })
  @Field('联系电话') phone!: string
}
