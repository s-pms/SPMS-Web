import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 单据明细抽象基类
 *
 * @author Hamm
 */
export abstract class AbstractBaseBillDetailEntity extends BaseEntity {
  /**
   * # 明细所属编号
   */
  abstract billId: number

  @TableField({
    removed: true,
  })
  declare updateTime: number

  /**
   * # 数量
   */
  abstract quantity: number

  /**
   * # 已完成数量
   */
  abstract finishQuantity: number
}
