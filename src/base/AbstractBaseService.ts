import { AbstractCurdService, FeedbackUtil } from '@airpower/web'
import type { BaseEntity } from './BaseEntity'

/**
 * # 抽象服务基类
 * @author Hamm.cn
 */
export abstract class AbstractBaseService<E extends BaseEntity> extends AbstractCurdService<E> {
  /**
   * ### 发布实体
   * @param entity 实体
   */
  async publish(entity: E): Promise<void> {
    await this.api('publish').request(entity)
    FeedbackUtil.toastSuccess('发布成功')
  }
}
