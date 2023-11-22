import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { MoveStatus } from './MoveStatus'

/**
 * # 移库状态枚举字典
 *
 * @author Hamm
 */
export const MoveStatusDictionary = AirDictionaryArray.create([
  { key: MoveStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: MoveStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: MoveStatus.MOVING, color: AirColor.WARNING, label: '移动中' },
  { key: MoveStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
