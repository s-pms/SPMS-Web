import type { AbstractBaseService } from '@/base/AbstractBaseService'
import type { BaseEntity } from '@/base/BaseEntity'
import type { IBaseTableResult } from '@/hook/IBaseTableResult'
import type { CurdServiceConstructor, ITableOption } from '@airpower/web'
import { FeedbackUtil, useTable as useAirTable } from '@airpower/web'

/**
 * # 单据的表格Hooks
 * @param serviceClass 单据服务类
 * @param option (可选) 可选配置项
 * @author Hamm.cn
 */
export function useTable<E extends BaseEntity, S extends AbstractBaseService<E>>(
  serviceClass: CurdServiceConstructor<E, S>,
  option: ITableOption<E> = {},
): IBaseTableResult<E, S> {
  const result = useAirTable(serviceClass, option)

  /**
   * ### 实体发布
   * @param entity 实体
   */
  async function onPublish(entity: E) {
    await FeedbackUtil.confirmWarning('发布后将无法再次修改，是否确认？', '确认发布')
    await result.service.publish(entity)
    result.onReloadData()
  }

  return {
    onPublish,
    ...result,
  }
}
