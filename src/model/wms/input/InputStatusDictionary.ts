import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { InputStatus } from './InputStatus'

/**
 * # 入库状态枚举字典
 *
 * @author Hamm
 */
export const InputStatusDictionary = AirDictionaryArray.create([
  { key: InputStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: InputStatus.CANCELED, color: AirColor.NORMAL, label: '已取消' },
  { key: InputStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: InputStatus.INPUTING, color: AirColor.WARNING, label: '入库中' },
  { key: InputStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
