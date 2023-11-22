import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { PurchaseStatus } from './PurchaseStatus'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 采购单状态枚举字典
 *
 * @author Hamm
 */
export const PurchaseStatusDictionary = AirDictionaryArray.create([
  { key: PurchaseStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: PurchaseStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: PurchaseStatus.PURCHASING, color: AirColor.SUCCESS, label: '采购中' },
  { key: PurchaseStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
  { key: PurchaseStatus.FINISHED, color: AirColor.NORMAL, label: '已入库' },
])
