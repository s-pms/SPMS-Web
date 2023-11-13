import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'
import { PlanType } from './PlanType'

/**
 * # 计划类型枚举字典
 *
 * @author Hamm
 */
export const PlanTypeDictionary = AirDictionaryArray.create([
  { key: PlanType.INNER, color: AirColor.NORMAL, label: '内部计划' },
  { key: PlanType.SALE, color: AirColor.SUCCESS, label: '外销计划' },
])
