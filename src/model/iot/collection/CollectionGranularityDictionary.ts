import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { CollectionGranularity } from './CollectionGranularity'

export const CollectionGranularityDictionary = AirDictionaryArray.create([
  { key: CollectionGranularity.ONE_MINUTE, label: '每分钟' },
  { key: CollectionGranularity.FIVE_MINUTES, label: '每五分钟' },
  { key: CollectionGranularity.THIRTY_MINUTES, label: '每半小时' },
  { key: CollectionGranularity.ONE_HOUR, label: '每小时' },
  { key: CollectionGranularity.ONE_DAY, label: '每天' },
  { key: CollectionGranularity.ONE_WEEK, label: '每周' },
  { key: CollectionGranularity.ONE_MONTH, label: '每月' },
])
