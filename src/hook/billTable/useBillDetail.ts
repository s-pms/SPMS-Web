import { ClassConstructor } from '@/airpower/type/ClassConstructor'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { IUseBillDetailResult } from './IUseBillDetailResult'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { IJson } from '@/airpower/interface/IJson'
import { IUseDetailOption } from '@/airpower/interface/IUseDetailOption'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { BillAddFinishDialog } from '@/component'

export function useBillDetail<D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>, S extends AbstractBaseBillService<D, B>>(props: IJson, entityClass: ClassConstructor<B>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<B> = {}): IUseBillDetailResult<D, B, S> {
  const result = useAirDetail(props, entityClass, serviceClass, option)

  async function onAddFinish(detail: D) {
    const postData = detail.copy()
    const dec = 100000
    const number: number = await AirDialog.show(BillAddFinishDialog, parseFloat((Math.ceil((detail.quantity - detail.finishQuantity) * dec) / dec).toString()))
    postData.quantity = Math.max(number, 0)
    await result.service.addFinish(postData.expose('id', 'quantity', 'billId'))
    result.getDetail()
  }

  return {
    onAddFinish, ...result,
  }
}
