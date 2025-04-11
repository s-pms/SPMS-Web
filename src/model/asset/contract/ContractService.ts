import { AbstractBaseService } from '@/base/AbstractBaseService'
import { ContractEntity } from './ContractEntity'

export class ContractService extends AbstractBaseService<ContractEntity> {
  entityClass = ContractEntity

  baseUrl = 'contract'
}
