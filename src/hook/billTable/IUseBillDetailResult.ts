import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import type { IDetailResult } from '@airpower/web'

/**
 * # 单据详情Hook
 *
 * @author Hamm.cn
 */
export interface IUseBillDetailResult<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
> extends IDetailResult<B, S> {
  addDetailFinishQuantity: (billDetail: D, billId: number) => void
}
