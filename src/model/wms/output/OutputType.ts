/* eslint-disable no-unused-vars */
/**
 * # 入库类型枚举
 *
 * @author Hamm
 */
export enum OutputType {
  /**
   * # 销售出库
   */
  SALE = 1,

  /**
   * # 领料出库
   */
  PICKOUT = 2,

  /**
   * # 盘点出库
   */
  REVIEW = 3,

  /**
   * # 转移出库
   */
  MOVE = 4,

  /**
   * # 其他出库
   */
  OTHER = 5,
}
