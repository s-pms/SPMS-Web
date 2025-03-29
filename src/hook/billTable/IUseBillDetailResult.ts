import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import type { IUseDetailResult } from '@airpower/interface/hooks/IUseDetailResult'

/**
 * # 单据详情Hook
 *
 * @author Hamm.cn
 */
export interface IUseBillDetailResult<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
> extends IUseDetailResult<B, S> {
  addDetailFinishQuantity: (billDetail: D, billId: number) => void
}
