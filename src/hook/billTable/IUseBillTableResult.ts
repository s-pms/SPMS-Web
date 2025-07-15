import type {AbstractBaseBillEntity} from '@/base/bill/AbstractBaseBillEntity'
import type {AbstractBaseBillService} from '@/base/bill/AbstractBaseBillService'
import type {AbstractBaseBillDetailEntity} from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import type {ITableResult} from '@airpower/web'

/**
 * # 单据表格Hook
 *
 * @author Hamm.cn
 */
export interface IUseBillTableResult<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
> extends ITableResult<B, S> {
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
   * ### 标记单据所有明细已完成
   * @param bill
   */
  setBillDetailsAllFinished: (bill: B) => void

  /**
   * ### 完成单据
   * @param bill
   */
  setBillFinished: (bill: B) => void
}
