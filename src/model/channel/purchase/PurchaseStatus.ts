/* eslint-disable no-unused-vars */
/**
 * # 采购单状态枚举
 *
 * @author Hamm
 */
export enum PurchaseStatus {

  /**
   * # 审核中
   */
  AUDITING = 1,

  /**
   * # 已驳回
   */
  REJECTED = 2,

  /**
   * # 采购中
   */
  PURCHASING = 3,

  /**
   * # 已完成
   */
  DONE = 4,

  /**
   * # 已入库
   */
  FINISHED = 5,
}
