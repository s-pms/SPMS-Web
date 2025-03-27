/* eslint-disable no-unused-vars */
import { IUseTableResult } from '@airpower/interface/hooks/IUseTableResult'
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 单据表格Hook
 *
 * @author Hamm.cn
 */
export interface IBaseTableResult<
  E extends BaseEntity,
  S extends AbstractBaseService<E>
> extends IUseTableResult<E, S> {
  /**
   * ### 发布
   * @param entity 实体
   */
  onPublish: (entity: E) => void
}
