import type {AbstractBaseService} from '@/base/AbstractBaseService'
import type {BaseEntity} from '@/base/BaseEntity'
import type {ITableResult} from '@airpower/web'

/**
 * # 单据表格Hook
 *
 * @author Hamm.cn
 */
export interface IBaseTableResult<E extends BaseEntity, S extends AbstractBaseService<E>>
  extends ITableResult<E, S> {
  /**
   * ### 发布
   * @param entity 实体
   */
  onPublish: (entity: E) => void
}
