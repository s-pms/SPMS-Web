/* eslint-disable no-unused-vars */
/**
 * # 采购单状态枚举
 *
 * @author Hamm
 */
export enum SaleStatus {

  /**
   * # 审核中
   */
  AUDITING = 1,

  /**
   * # 已驳回
   */
  REJECTED = 2,

  /**
   * # 出库中
   */
  OUTPUTING = 3,

  /**
   * # 已完成
   */
  DONE = 4,

  /**
   * # 已取消
   */
  CANCELED = 5,
}
