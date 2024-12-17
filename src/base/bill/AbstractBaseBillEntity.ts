import { Form } from '@/airpower/decorator/FormField'
import { BaseEntity } from '../BaseEntity'
import { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'
import { Table } from '@/airpower/decorator/TableField'
import { AirEnum } from '@/airpower/base/AirEnum'
import { IPayload } from '@/airpower/interface/IPayload'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 单据基类
 *
 * @author Hamm
 */
export abstract class AbstractBaseBillEntity<D extends AbstractBaseBillDetailEntity> extends BaseEntity implements IPayload {
  /**
   * ### 单据编号
   */
  @Table({
    orderNumber: 99,
    forceShow: true,
  })
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
    showColor: true,
  })
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
  abstract getAuditingStatus(): AirEnum;

  /**
   * ### 已审核的状态
   */
  abstract getAuditedStatus(): AirEnum;

  /**
   * ### 已拒绝的状态
   */
  abstract getRejectedStatus(): AirEnum;

  getPayloadLabel(): string {
    return this.billCode
  }

  /**
   * ### 是否可拒绝
   */
  canReject() {
    return this.getAuditingStatus()
      .equalsKey(this.status)
  }

  /**
   * ### 是否可审核
   */
  canAudit() {
    return this.getAuditingStatus()
      .equalsKey(this.status)
  }

  /**
   * ### 是否已拒绝
   */
  isRejected() {
    return this.getRejectedStatus()
      .equalsKey(this.status)
  }
}
