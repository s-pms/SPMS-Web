import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PickingDetailEntity } from './PickingDetailEntity'

export class PickingDetailService extends AbstractBaseService<PickingDetailEntity> {
  entityClass = PickingDetailEntity

  baseUrl = 'pickingDetail'
}
