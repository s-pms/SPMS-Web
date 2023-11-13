import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { PlanStatus } from './PlanStatus'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm
 */
export const PlanStatusDictionary = AirDictionaryArray.create([
  { key: PlanStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: PlanStatus.CANCELED, color: AirColor.NORMAL, label: '已取消' },
  { key: PlanStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: PlanStatus.PRODUCING, color: AirColor.WARNING, label: '生产中' },
  { key: PlanStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
