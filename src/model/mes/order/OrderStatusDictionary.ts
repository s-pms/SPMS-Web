import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { OrderStatus } from './OrderStatus'

/**
 * # 计划状态枚举字典
 *
 * @author Hamm
 */
export const OrderStatusDictionary = AirDictionaryArray.create([
  { key: OrderStatus.AUDITING, color: AirColor.WARNING, label: '审核中' },
  { key: OrderStatus.CANCELED, color: AirColor.NORMAL, label: '已取消' },
  { key: OrderStatus.REJECTED, color: AirColor.DANGER, label: '已驳回' },
  { key: OrderStatus.PRODUCING, color: AirColor.WARNING, label: '生产中' },
  { key: OrderStatus.DONE, color: AirColor.NORMAL, label: '已完成' },
])
