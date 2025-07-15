import type {CurdServiceConstructor, ITableOption} from '@airpower/web'
import type {IUseBillTableResult} from './IUseBillTableResult'
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import {DialogUtil, FeedbackUtil, getModelName} from '@airpower/web'
import { BillRejectDialog } from '@/component'
import { useMyTable } from '../useMyTable'

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
  serviceClass: CurdServiceConstructor<B, S>,
  option: ITableOption<B> = {},
): IUseBillTableResult<D, B, S> {
  const result = useMyTable(serviceClass, option)

  /**
   * ### 单据审核
   * @param bill 单据
   */
  async function onAudit(bill: B) {
    await FeedbackUtil.confirmWarning(`是否确认审核选择的${getModelName(result.service.entityClass)}？`)
    await result.service.audit(bill)
    result.onReloadData()
  }

  /**
   * ### 设置单据明细都已完成
   * @param bill 单据
   */
  async function setBillDetailsAllFinished(bill: B) {
    await FeedbackUtil.confirmWarning(`是否确认设置${getModelName(result.service.entityClass)}已完成？`)
    await result.service.setBillDetailsAllFinished(bill)
    result.onReloadData()
  }

  /**
   * ### 设置单据已完成
   * @param bill 单据
   */
  async function setBillFinished(bill: B) {
    await FeedbackUtil.confirmWarning(`是否确认设置所有${getModelName(result.service.entityClass)}明细都已完成？`)
    await result.service.setBillFinished(bill)
    result.onReloadData()
  }

  /**
   * ### 单据驳回
   * @param bill 单据
   */
  async function onReject(bill: B) {
    const rejectReason: string = await DialogUtil.show(BillRejectDialog, `驳回${getModelName(result.service.entityClass)}的原因`)
    await FeedbackUtil.confirmWarning(`是否确认驳回选择的${getModelName(result.service.entityClass)}？`)
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
