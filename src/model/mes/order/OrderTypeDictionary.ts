import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { OrderType } from './OrderType'

/**
 * # 订单类型枚举字典
 *
 * @author Hamm
 */
export const OrderTypeDictionary = AirDictionaryArray.create([
  { key: OrderType.OTHER, color: AirColor.SUCCESS, label: '其他订单' },
  { key: OrderType.PLAN, color: AirColor.WARNING, label: '计划订单' },
])
