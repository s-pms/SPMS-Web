import { AbstractBaseService } from '../AbstractBaseService'
import { AbstractBaseBillEntity } from './AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'

/**
 * # 单据抽象服务基类
 *
 * @author Hamm.cn
 */
export abstract class AbstractBaseBillService<
  D extends AbstractBaseBillDetailEntity,
  B extends AbstractBaseBillEntity<D>
> extends AbstractBaseService<B> {
  /**
   * ### 审核单据
   * @param bill 单据
   */
  async audit(bill: B): Promise<void> {
    await this.api('audit')
      .post(bill)
  }

  /**
   * ### 驳回单据
   * @param bill 单据
   */
  async reject(bill: B): Promise<void> {
    await this.api('reject')
      .post(bill)
  }

  /**
   * ### 完成单据
   * @param bill 单据
   */
  async setBillFinished(bill: B): Promise<void> {
    await this.api('setBillFinished')
      .post(bill)
  }

  /**
   * ### 完成单据所有明细
   * @param bill 单据
   */
  async setBillDetailsAllFinished(bill: B): Promise<void> {
    await this.api('setBillDetailsAllFinished')
      .post(bill)
  }

  /**
   * ### 添加完成数量
   * @param bill 单据
   */
  async addFinish(bill: D): Promise<void> {
    await this.api('addFinish')
      .post(bill)
  }
}
