import {
  AbstractBaseService,
} from '../../../../../../airpower/airpower-starter/AirPowerWebStarter/src/base/AbstractBaseService'
import { DepartmentEntity } from './DepartmentEntity'

/**
 * # 部门接口服务
 * @author Hamm.cn
 */
export class DepartmentService extends AbstractBaseService<DepartmentEntity> {
  baseUrl = 'department'

  entityClass = DepartmentEntity
}
