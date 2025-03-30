import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import type { IUseDetailOption } from '@airpower/interface/hooks/IUseDetailOption'
import type { IJson } from '@airpower/interface/IJson'
import type { ClassConstructor } from '@airpower/type/AirType'
import type { IUseBillDetailResult } from './IUseBillDetailResult'
import { BillAddFinishDialog } from '@/component'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirDetail } from '@airpower/hook/useAirDetail'

/**
 * ### 单据明细
 * @param props Props
 * @param entityClass 实体类
 * @param serviceClass 服务类
 * @param option 配置项
 */
export function useBillDetail<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
>(
  props: IJson,
  entityClass: ClassConstructor<B>,
  serviceClass: ClassConstructor<S>,
  option: IUseDetailOption<B> = {},
): IUseBillDetailResult<D, B, S> {
  const result = useAirDetail(props, entityClass, serviceClass, option)

  /**
   * ### 添加完成数量
   * @param detail 明细
   * @param billId 单据ID
   */
  async function addDetailFinishQuantity(detail: D, billId: number) {
    detail.billId = billId
    const postData = detail.copy()
    const dec = 100000
    const number: number = await AirDialog.show(
      BillAddFinishDialog,
      Number.parseFloat((Math.ceil((detail.quantity - detail.finishQuantity) * dec) / dec).toString()),
    )
    postData.quantity = Math.max(number, 0)
    await result.service.addDetailFinishQuantity(postData.expose('id', 'quantity', 'billId'))
    result.getDetail()
  }

  return {
    ...result,
    addDetailFinishQuantity,
  }
}
