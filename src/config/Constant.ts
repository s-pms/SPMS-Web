export class Constant {
  static MILLISECOND_PER_SECOND = 1000

  static SECOND_PER_MINUTE = 60

  static SECOND_PER_HOUR = this.SECOND_PER_MINUTE ** 2

  static HOUR_PER_DAY = 24

  static SECOND_PER_DAY = Constant.SECOND_PER_HOUR * Constant.HOUR_PER_DAY

  static DAY_PER_WEEK = 7

  static DAY_PER_MONTH = 30

  static MONTH_PER_YEAR = 12

  static DAY_PER_YEAR = 365

  static BOOLEAN_YES = '1'

  static BOOLEAN_NO = '0'
}
