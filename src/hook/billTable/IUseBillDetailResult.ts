/* eslint-disable no-unused-vars */
import { IUseDetailResult } from '@airpower/interface/hooks/IUseDetailResult'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

/**
 * # 单据详情Hook
 *
 * @author Hamm.cn
 */
export interface IUseBillDetailResult<D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>, S extends AbstractBaseBillService<D, B>> extends IUseDetailResult<B, S> {

  addDetailFinishQuantity: (billDetail: D) => void
}
