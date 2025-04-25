import type { IPayload, WebEnum } from '@airpower/web'
import { Field, Form, Search, Table } from '@airpower/web'
import { BaseEntity } from '../BaseEntity'
import type { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'

/**
 * # 单据基类
 *
 * @author Hamm.cn
 */
export abstract class AbstractBaseBillEntity<D extends AbstractBaseBillDetailEntity>
  extends BaseEntity
  implements IPayload {
  /**
   * ### 单据编号
   */
  @Table({
    order: 99,
    force: true,
    copy: true,
  })
  @Search()
  @Form({
    placeholder: '不填写按编码规则自动生成',
  })
  @Field({
    label: '单据编号',
  })
  billCode!: string

  /**
   * ### 单据状态码
   */
  @Form({
    color: true,
  })
  @Search()
  abstract status: number

  /**
   * ### 单据明细列表
   */
  abstract details: D[]

  @Form({
    textarea: true,
  })
  @Field({
    label: '驳回原因',
  })
  rejectReason!: string

  /**
   * ### 审核中的状态
   */
  abstract getAuditingStatus(): WebEnum

  /**
   * ### 已审核的状态
   */
  abstract getAuditedStatus(): WebEnum

  /**
   * ### 已拒绝的状态
   */
  abstract getRejectedStatus(): WebEnum

  getPayloadLabel(): string {
    return this.billCode
  }

  /**
   * ### 是否可拒绝
   */
  canReject() {
    return this.getAuditingStatus().equalsKey(this.status)
  }

  /**
   * ### 是否可审核
   */
  canAudit() {
    return this.getAuditingStatus().equalsKey(this.status)
  }

  /**
   * ### 是否已拒绝
   */
  isRejected() {
    return this.getRejectedStatus().equalsKey(this.status)
  }
}
