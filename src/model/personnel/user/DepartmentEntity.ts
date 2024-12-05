import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { Field } from '@/airpower/decorator/Field'

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

  @Field({
    // eslint-disable-next-line no-use-before-define
    type: DepartmentEntity,
    array: true,
  })
    children: this[] = []
}
