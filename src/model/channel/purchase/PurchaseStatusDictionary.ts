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
  { key: PurchaseStatus.CANCELED, color: AirColor.NORMAL, label: '已取消' },
  { key: PurchaseStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: PurchaseStatus.PURCHASING, color: AirColor.WARNING, label: '采购中' },
  { key: PurchaseStatus.INPUTING, color: AirColor.WARNING, label: '入库中' },
  { key: PurchaseStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
