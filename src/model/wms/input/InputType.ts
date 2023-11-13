/* eslint-disable no-unused-vars */
/**
 * # 入库类型枚举
 *
 * @author Hamm
 */
export enum InputType {
  /**
   * # 采购入库
   */
  PURCHASE = 1,

  /**
   * # 退料入库
   */
  RESTORE = 2,

  /**
   * # 生产入库
   */
  PRODUCE = 3,

  /**
   * # 盘点入库
   */
  REVIEW = 4,

  /**
   * # 转移入库
   */
  MOVE = 5,

  /**
   * # 其他入库
   */
  OTHER = 6,
}
