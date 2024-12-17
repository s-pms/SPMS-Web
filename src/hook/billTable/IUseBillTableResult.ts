/* eslint-disable no-unused-vars */
import { IUseTableResult } from '@/airpower/interface/hooks/IUseTableResult'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

/**
 * # 单据表格Hook
 *
 * @author Hamm
 */
export interface IUseBillTableResult<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>
> extends IUseTableResult<B, S> {
  /**
   * ### 审核
   * @param bill 单据
   */
  onAudit: (bill: B) => void

  /**
   * ### 驳回
   * @param bill 单据
   */
  onReject: (bill: B) => void

  /**
   * ### 完成单据
   * @param bill
   */
  onFinish: (bill: B) => void
}
