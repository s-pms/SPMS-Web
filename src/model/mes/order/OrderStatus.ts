/* eslint-disable no-unused-vars */
/**
 * # 生产订单状态枚举
 *
 * @author Hamm
 */
export enum OrderStatus {

  /**
   * # 审核中
   */
  AUDITING = 1,

  /**
   * # 已驳回
   */
  REJECTED = 2,

  /**
   * # 生产中
   */
  PRODUCING = 3,

  /**
   * # 已完成
   */
  DONE = 4,

  /**
   * # 已取消
   */
  CANCELED = 5,
}
