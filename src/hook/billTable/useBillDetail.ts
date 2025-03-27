import { useAirDetail } from '@airpower/hook/useAirDetail'
import { IJson } from '@airpower/interface/IJson'
import { IUseDetailOption } from '@airpower/interface/hooks/IUseDetailOption'
import { AirDialog } from '@airpower/helper/AirDialog'
import { ClassConstructor } from '@airpower/type/AirType'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { IUseBillDetailResult } from './IUseBillDetailResult'
import { BillAddFinishDialog } from '@/component'

/**
 * ### 单据明细
 * @param props Props
 * @param entityClass 实体类
 * @param serviceClass 服务类
 * @param option 配置项
 */
export function useBillDetail<D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>, S extends AbstractBaseBillService<D, B>>(props: IJson, entityClass: ClassConstructor<B>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<B> = {}): IUseBillDetailResult<D, B, S> {
  const result = useAirDetail(props, entityClass, serviceClass, option)

  /**
   * ### 添加完成数量
   * @param detail 明细
   */
  async function addDetailFinishQuantity(detail: D) {
    const postData = detail.copy()
    const dec = 100000
    const number: number = await AirDialog.show(BillAddFinishDialog, parseFloat((Math.ceil((detail.quantity - detail.finishQuantity) * dec) / dec).toString()))
    postData.quantity = Math.max(number, 0)
    await result.service.addDetailFinishQuantity(postData.expose('id', 'quantity', 'billId'))
    result.getDetail()
  }

  return {
    ...result, addDetailFinishQuantity,
  }
}
