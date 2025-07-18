import type { IPayload } from '@airpower/web'
import { Field, Form, Model, Search, Table } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'

@Model({
  label: '计量单位',
})
export class UnitEntity extends BaseEntity implements IPayload {
  /**
   * ### 单位名称
   */
  @Table({
    force: true,
    copy: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '单位名称',
  })
  @Search()
  name!: string

  /**
   * ### 单位编码
   */
  @Table({
    copy: true,
    force: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '单位编码',
  })
  @Search()
  code!: string

  getPayloadLabel(): string {
    return `${this.name} (${this.code})`
  }
}
