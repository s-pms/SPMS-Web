import { AirEnum } from '@/airpower/base/AirEnum'
import { Constant } from '@/config/Constant'

export class CollectionGranularityEnum extends AirEnum {
  static ONE_MINUTE = new CollectionGranularityEnum(Constant.SECOND_PER_MINUTE, '每分钟')

  static FIVE_MINUTES = new CollectionGranularityEnum(Constant.SECOND_PER_MINUTE * 5, '每五分钟')

  static THIRTY_MINUTES = new CollectionGranularityEnum(Constant.SECOND_PER_HOUR / 2, '每半小时')

  static ONE_HOUR = new CollectionGranularityEnum(Constant.SECOND_PER_HOUR, '每小时')

  static ONE_DAY = new CollectionGranularityEnum(Constant.SECOND_PER_DAY, '每天')

  static ONE_WEEK = new CollectionGranularityEnum(Constant.SECOND_PER_DAY * Constant.DAY_PER_WEEK, '每周')

  static ONE_MONTH = new CollectionGranularityEnum(Constant.SECOND_PER_DAY * Constant.DAY_PER_MONTH, '每月')
}
