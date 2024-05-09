import { IUseTableOption } from '@/airpower/interface/IUseTableOption'
import { ClassConstructor } from '@/airpower/type/ClassConstructor'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { IUseBillTableResult } from './IUseBillTableResult'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { BillRejectDialog } from '@/component'

export function useBillTable<D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>, S extends AbstractBaseBillService<D, B>>(entityClass: ClassConstructor<B>, serviceClass: ClassConstructor<S>, option: IUseTableOption<B> = {}): IUseBillTableResult<D, B, S> {
  const result = useAirTable(entityClass, serviceClass, option)

  async function onAudit(bill: B) {
    await AirConfirm.warning(`是否确认审核选择的${result.entity.getModelName()}？`)
    await result.service.audit(bill)
    result.onReloadData()
  }

  async function onFinish(bill: B) {
    await AirConfirm.warning(`是否确认手动完成选择的${result.entity.getModelName()}？`)
    await result.service.finish(bill)
    result.onReloadData()
  }

  async function onReject(bill: B) {
    const rejectReason: string = await AirDialog.show(BillRejectDialog, `驳回${result.entity.getModelName()}的原因`)
    await AirConfirm.warning(`是否确认驳回选择的${result.entity.getModelName()}？`)
    bill.rejectReason = rejectReason
    await result.service.reject(bill)
    result.onReloadData()
  }

  return {
    onFinish, onAudit, onReject, ...result,
  } as IUseBillTableResult<D, B, S>
}
