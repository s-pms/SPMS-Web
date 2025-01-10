import { BaseEntity } from '@/base/BaseEntity'
import {
  Field, Form, Model, Table,
} from '@/airpower/decorator'
import { IPayload } from '@/airpower/interface/IPayload'

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
