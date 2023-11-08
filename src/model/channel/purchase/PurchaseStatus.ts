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
   * # 入库中
   */
  INPUTING = 4,

  /**
   * # 采购完成
   */
  DONE = 5,

  /**
   * # 采购取消
   */
  CANCELED = 6,
}
