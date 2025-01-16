import { AbstractBaseService } from '@/base/AbstractBaseService'
import { BomDetailEntity } from './BomDetailEntity'

export class BomDetailService extends AbstractBaseService<BomDetailEntity> {
  entityClass = BomDetailEntity

  baseUrl = 'bomDetail'
}
