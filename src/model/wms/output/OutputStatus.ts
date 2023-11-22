/* eslint-disable no-unused-vars */
/**
 * # 出库状态枚举
 *
 * @author Hamm
 */
export enum OutputStatus {

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
  OUTPUTTING = 3,

  /**
   * # 已完成
   */
  DONE = 4,
}
