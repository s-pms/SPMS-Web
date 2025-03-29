import type { AbstractBaseService } from '@/base/AbstractBaseService'
import type { BaseEntity } from '@/base/BaseEntity'
import type { IBaseTableResult } from '@/hook/IBaseTableResult'
import type { IUseTableOption } from '@airpower/interface/hooks/IUseTableOption'
import type { ClassConstructor } from '@airpower/type/AirType'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { useAirTable } from '@airpower/hook/useAirTable'

/**
 * # 单据的表格Hooks
 * @param entityClass 单据类
 * @param serviceClass 单据服务类
 * @param option (可选) 可选配置项
 * @author Hamm.cn
 */
export function useTable<E extends BaseEntity, S extends AbstractBaseService<E>>(
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseTableOption<E> = {},
): IBaseTableResult<E, S> {
  const result = useAirTable(entityClass, serviceClass, option)

  /**
   * ### 实体发布
   * @param entity 实体
   */
  async function onPublish(entity: E) {
    await AirConfirm.warning('发布后将无法再次修改，是否确认？', '确认发布')
    await result.service.publish(entity)
    result.onReloadData()
  }

  return {
    onPublish,
    ...result,
  }
}
