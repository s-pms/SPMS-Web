import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { Type } from '@/airpower/decorator/Custom'

/**
 * # 部门实体
 * @author Hamm
 */
export class DepartmentEntity extends BaseEntity implements ITree {
  /**
   * # 部门名称
   */
  name!: string

  /**
   * # 下级部门
   */
  // eslint-disable-next-line no-use-before-define
  @Type(DepartmentEntity, true) children: this[] = []
}
