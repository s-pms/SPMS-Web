import { AbstractBaseService } from '@/base/AbstractBaseService'
import { SupplierEntity } from './SupplierEntity'

export class SupplierService extends AbstractBaseService<SupplierEntity> {
  entityClass = SupplierEntity

  baseUrl = 'supplier'
}
