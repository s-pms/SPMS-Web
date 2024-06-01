import { AirEnum } from '@/airpower/base/AirEnum'

export class CollectionGranularityEnum extends AirEnum {
  static ONE_MINUTE = new CollectionGranularityEnum(60, '每分钟')

  static FIVE_MINUTES = new CollectionGranularityEnum(300, '每五分钟')

  static THIRTY_MINUTES = new CollectionGranularityEnum(1800, '每半小时')

  static ONE_HOUR = new CollectionGranularityEnum(3600, '每小时')

  static ONE_DAY = new CollectionGranularityEnum(86400, '每天')

  static ONE_WEEK = new CollectionGranularityEnum(604800, '每周')

  static ONE_MONTH = new CollectionGranularityEnum(2678400, '每月')
}
