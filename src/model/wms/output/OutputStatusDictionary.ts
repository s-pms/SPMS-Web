import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { OutputStatus } from './OutputStatus'

/**
 * # 出库状态枚举字典
 *
 * @author Hamm
 */
export const OutputStatusDictionary = AirDictionaryArray.create([
  { key: OutputStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: OutputStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: OutputStatus.OUTPUTTING, color: AirColor.SUCCESS, label: '出库中' },
  { key: OutputStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
