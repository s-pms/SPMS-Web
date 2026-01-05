import type { CurdServiceConstructor, IDetailOption, IJson } from '@airpower/web'
import type { IUseBillDetailResult } from './IUseBillDetailResult'
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { DialogUtil, useDetail } from '@airpower/web'
import { BillAddFinishDialog } from '@/component'

/**
 * ### 单据明细
 * @param props Props
 * @param serviceClass 服务类
 * @param option 配置项
 */
export function useBillDetail<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
>(
  props: IJson,
  serviceClass: CurdServiceConstructor<B, S>,
  option: IDetailOption<B> = {},
): IUseBillDetailResult<D, B, S> {
  const result = useDetail(props, serviceClass, option)

  /**
   * ### 添加完成数量
   * @param detail 明细
   * @param billId 单据ID
   */
  async function addDetailFinishQuantity(detail: D, billId: number) {
    detail.billId = billId
    const postData = detail.copy()
    const dec = 100000
    const number: number = await DialogUtil.show(
      BillAddFinishDialog,
      Number.parseFloat((Math.ceil((detail.quantity - detail.finishQuantity) * dec) / dec).toString()),
    )
    postData.quantity = Math.max(number, 0)
    postData.expose('id', 'quantity', 'billId')
    await result.service.addDetailFinishQuantity(postData)
    result.getDetail()
  }

  return {
    ...result,
    addDetailFinishQuantity,
  }
}
