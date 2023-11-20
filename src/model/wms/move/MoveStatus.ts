/* eslint-disable no-unused-vars */
/**
 * # 移库状态枚举
 *
 * @author Hamm
 */
export enum MoveStatus {

  /**
   * # 审核中
   */
  AUDITING = 1,

  /**
   * # 已驳回
   */
  REJECTED = 2,

  /**
   * # 移动中
   */
  MOVING = 3,

  /**
   * # 已完成
   */
  DONE = 4,

  /**
   * # 已取消
   */
  CANCELED = 5,
}
