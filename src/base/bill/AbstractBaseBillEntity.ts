import { Field } from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { BaseEntity } from '../BaseEntity'
import { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'
import { ISelector } from '@/airpower/interface/ISelector'
import { Table } from '@/airpower/decorator/TableField'

/**
 * # 单据基类
 *
 * @author Hamm
 */
export abstract class AbstractBaseBillEntity<D extends AbstractBaseBillDetailEntity> extends BaseEntity implements ISelector {
  /**
   * # 单据编号
   */
  @Table({
    orderNumber: 99,
    forceShow: true,
  })
  @Form({
    placeholder: '不填写按编码规则自动生成',
  })
  @Field('单据编号') billCode!: string

  /**
   * # 单据状态码
   */
  abstract status: number

  /**
   * # 单据明细列表
   */
  abstract details: D[]

  @Form({
    textarea: true,
  })
  @Field('驳回原因') rejectReason!: string

  getSelectorLabel(): string {
    return this.billCode
  }
}
