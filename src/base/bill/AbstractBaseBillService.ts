import type { AbstractBaseBillEntity } from './AbstractBaseBillEntity'
import type { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'
import { AbstractBaseService } from '../AbstractBaseService'

/**
 * # 单据抽象服务基类
 *
 * @author Hamm.cn
 */
export abstract class AbstractBaseBillService<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>,
> extends AbstractBaseService<B> {
  /**
   * ### 审核单据
   * @param bill 单据
   */
  async audit(bill: B): Promise<void> {
    await this.api('audit').request(bill)
  }

  /**
   * ### 驳回单据
   * @param bill 单据
   */
  async reject(bill: B): Promise<void> {
    await this.api('reject').request(bill)
  }

  /**
   * ### 完成单据
   * @param bill 单据
   */
  async setBillFinished(bill: B): Promise<void> {
    await this.api('setBillFinished').request(bill)
  }

  /**
   * ### 完成单据所有明细
   * @param bill 单据
   */
  async setBillDetailsAllFinished(bill: B): Promise<void> {
    await this.api('setBillDetailsAllFinished').request(bill)
  }

  /**
   * ### 添加完成数量
   * @param bill 单据
   */
  async addDetailFinishQuantity(bill: D): Promise<void> {
    await this.api('addFinish').request(bill)
  }
}
