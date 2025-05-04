import { DateTimeUtil, WebEnum } from '@airpower/web'

export class CollectionGranularityEnum extends WebEnum {
  static ONE_MINUTE = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_MINUTE, '每分钟')

  static FIVE_MINUTES = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_MINUTE * 5, '每五分钟')

  static THIRTY_MINUTES = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_HOUR / 2, '每半小时')

  static ONE_HOUR = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_HOUR, '每小时')

  static ONE_DAY = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_DAY, '每天')

  static ONE_WEEK = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_DAY * DateTimeUtil.DAY_PER_WEEK, '每周')

  static ONE_MONTH = new CollectionGranularityEnum(DateTimeUtil.SECOND_PER_DAY * DateTimeUtil.DAY_PER_MONTH, '每月')
}
