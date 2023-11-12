/* eslint-disable no-unused-vars */
import { IUseTableResult } from '@/airpower/interface/IUseTableResult'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

/**
 * # 单据表格Hook
 *
 * @author Hamm
 */
export interface IUseBillTableResult<D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>, S extends AbstractBaseBillService<D, B>> extends IUseTableResult<B, S> {
  onAudit: (bill: B) => void

  onReject: (bill: B) => void
}
