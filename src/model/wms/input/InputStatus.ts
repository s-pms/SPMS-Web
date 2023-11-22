/* eslint-disable no-unused-vars */
/**
 * # 入库状态枚举
 *
 * @author Hamm
 */
export enum InputStatus {

  /**
   * # 审核中
   */
  AUDITING = 1,

  /**
   * # 已驳回
   */
  REJECTED = 2,

  /**
   * # 入库中
   */
  INPUTING = 3,

  /**
   * # 已完成
   */
  DONE = 4,
}
