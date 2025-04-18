import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import type { IUseTableOption } from '@airpower/interface/hooks/IUseTableOption'
import type { ServiceConstructor } from '@airpower/type/AirType'
import type { IUseBillTableResult } from './IUseBillTableResult'
import { BillRejectDialog } from '@/component'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirTable } from '@airpower/hook/useAirTable'

/**
 * # 单据的表格Hooks
 * @param serviceClass 单据服务类
 * @param option (可选) 可选配置项
 * @author Hamm.cn
 */
export function useBillTable<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
  S extends AbstractBaseBillService<D, B>,
>(
  serviceClass: ServiceConstructor<B, S>,
  option: IUseTableOption<B> = {},
): IUseBillTableResult<D, B, S> {
  const result = useAirTable(serviceClass, option)

  /**
   * ### 单据审核
   * @param bill 单据
   */
  async function onAudit(bill: B) {
    await AirConfirm.warning(`是否确认审核选择的${result.entity.getModelName()}？`)
    await result.service.audit(bill)
    result.onReloadData()
  }

  /**
   * ### 设置单据明细都已完成
   * @param bill 单据
   */
  async function setBillDetailsAllFinished(bill: B) {
    await AirConfirm.warning(`是否确认设置${result.entity.getModelName()}已完成？`)
    await result.service.setBillDetailsAllFinished(bill)
    result.onReloadData()
  }

  /**
   * ### 设置单据已完成
   * @param bill 单据
   */
  async function setBillFinished(bill: B) {
    await AirConfirm.warning(`是否确认设置所有${result.entity.getModelName()}明细都已完成？`)
    await result.service.setBillFinished(bill)
    result.onReloadData()
  }

  /**
   * ### 单据驳回
   * @param bill 单据
   */
  async function onReject(bill: B) {
    const rejectReason: string = await AirDialog.show(BillRejectDialog, `驳回${result.entity.getModelName()}的原因`)
    await AirConfirm.warning(`是否确认驳回选择的${result.entity.getModelName()}？`)
    bill.rejectReason = rejectReason
    await result.service.reject(bill)
    result.onReloadData()
  }

  return {
    setBillFinished,
    setBillDetailsAllFinished,
    onAudit,
    onReject,
    ...result,
  }
}
