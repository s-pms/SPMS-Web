import {
  Field, Form, Model, Table,
} from '@airpower/decorator'
import { IPayload } from '@airpower/interface/IPayload'
import { BaseEntity } from '@/base/BaseEntity'

@Model({
  label: '供应商',
})
export class SupplierEntity extends BaseEntity implements IPayload {
  /**
   * ### 供应商名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '供应商名称',
  })
    name!: string

  /**
   * ### 供应商编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '供应商编码',
  })
    code!: string

  /**
   * ### 联系电话
   */
  @Table()
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
