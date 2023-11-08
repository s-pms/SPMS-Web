import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CustomerEntity } from './CustomerEntity'

export class CustomerService extends AbstractBaseService<CustomerEntity> {
  entityClass = CustomerEntity

  baseUrl = 'customer'
}
