import type { IPayload } from '@airpower/web'
import { DesensitizeType, Field, Form, Model, Search, Table } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'

@Model({
  label: '客户',
})
export class CustomerEntity extends BaseEntity implements IPayload {
  /**
   * ### 客户名称
   */
  @Search()
  @Table({
    force: true,
    copy: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '客户名称',
  })
  name!: string

  /**
   * ### 客户编码
   */
  @Search()
  @Table({
    copy: true,
    force: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '客户编码',
  })
  code!: string

  /**
   * ### 联系电话
   */
  @Search()
  @Table({
    phone: true,
    desensitize: DesensitizeType.MOBILE,
  })
  @Form({
    phone: true,
  })
  @Field({
    label: '联系电话',
  })
  phone!: string

  getPayloadLabel(): string {
    return this.name
  }
}
