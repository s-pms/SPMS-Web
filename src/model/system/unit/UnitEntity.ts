import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { IPayload } from '@/airpower/interface/IPayload'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '计量单位',
})
export class UnitEntity extends BaseEntity implements IPayload {
  /**
   * ### 单位名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '单位名称',
  })
    name!: string

  /**
   * ### 单位编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '单位编码',
  })
    code!: string

  getPayloadLabel(): string {
    return `${this.name}(${this.code})`
  }
}
