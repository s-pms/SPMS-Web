import { Table } from '@/airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 单据明细抽象基类
 *
 * @author Hamm
 */
export abstract class AbstractBaseBillDetailEntity extends BaseEntity {
  /**
   * ### 单据ID
   */
  billId!: number

  @Table({
    removed: true,
  })
  declare updateTime: number

  /**
   * ### 数量
   */
  abstract quantity: number

  /**
   * ### 已完成数量
   */
  abstract finishQuantity: number
}
