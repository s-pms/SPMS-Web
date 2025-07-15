import type { IPayload } from '@airpower/web'
import { Field, Form, Model, Search, Table } from '@airpower/web'
import {BaseEntity} from '@/base/BaseEntity'

/**
 * # 工序
 * @author Hamm.cn
 */
@Model({
  label: '工序',
})
export class OperationEntity extends BaseEntity implements IPayload {
  /**
   * ### 工序名称
   */
  @Table({
    force: true,
    copy: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '工序名称',
  })
  name!: string

  /**
   * ### 工序编码
   */
  @Table({
    force: true,
    copy: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '工序编码',
  })
  code!: string

  getPayloadLabel(): string {
    return `${this.name} (${this.code})`
  }
}
