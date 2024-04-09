import { FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '../BaseEntity'
import { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { ISelector } from '@/airpower/interface/ISelector'

/**
 * # 单据基类
 *
 * @author Hamm
 */
export abstract class AbstractBaseBillEntity<D extends AbstractBaseBillDetailEntity> extends BaseEntity implements ISelector {
  /**
   * # 单据编号
   */
  abstract billCode: string

  /**
   * # 单据状态码
   */
  abstract status: number

  /**
   * # 单据明细列表
   */
  abstract details: D[]

  @FormField({
    textarea: true,
  })
  @FieldName('驳回原因') rejectReason!: string

  getSelectorLabel(): string {
    return this.billCode
  }
}
