import { AirEnum } from '@airpower/base/AirEnum'
import { AirConstant } from '@airpower/config/AirConstant'

export class DeviceReportDuration extends AirEnum {
  static readonly ONE_HOUR = new DeviceReportDuration(AirConstant.SECOND_PER_HOUR, '近一小时')

  static readonly THREE_HOUR = new DeviceReportDuration(AirConstant.SECOND_PER_HOUR * 3, '近三小时')

  static readonly SIX_HOUR = new DeviceReportDuration(AirConstant.SECOND_PER_HOUR * 6, '近六小时')

  static readonly HALF_DAY = new DeviceReportDuration(AirConstant.SECOND_PER_DAY / 2, '近半天')

  static readonly ONE_DAY = new DeviceReportDuration(AirConstant.SECOND_PER_DAY, '近一天')

  static readonly THREE_DAY = new DeviceReportDuration(AirConstant.SECOND_PER_DAY * 3, '近三天')

  static readonly ONE_WEEK = new DeviceReportDuration(AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_WEEK, '近一周')

  static readonly ONE_MONTH = new DeviceReportDuration(
    AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_MONTH,
    '近一个月',
  )

  static readonly THREE_MONTH = new DeviceReportDuration(
    AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_MONTH * 3,
    '近三个月',
  )

  static readonly HALF_YEAR = new DeviceReportDuration(
    (AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_YEAR) / 2,
    '近半年',
  )

  static readonly ONE_YEAR = new DeviceReportDuration(AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_YEAR, '近一年')

  static readonly THREE_YEAR = new DeviceReportDuration(
    AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_YEAR * 3,
    '近三年',
  )

  getSecond(): number {
    return this.key
  }

  getMillisecond(): number {
    return this.getSecond() * 1000
  }
}
