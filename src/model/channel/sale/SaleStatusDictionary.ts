import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { SaleStatus } from './SaleStatus'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 销售单状态枚举字典
 *
 * @author Hamm
 */
export const SaleStatusDictionary = AirDictionaryArray.create([
  { key: SaleStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: SaleStatus.CANCELED, color: AirColor.NORMAL, label: '已取消' },
  { key: SaleStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: SaleStatus.OUTPUTING, color: AirColor.WARNING, label: '出库中' },
  { key: SaleStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
