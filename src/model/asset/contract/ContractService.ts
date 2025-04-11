import { AbstractBaseService } from '@/base/AbstractBaseService'
import { ContractEntity } from './ContractEntity'

export class ContractService extends AbstractBaseService<ContractEntity> {
  entityClass = ContractEntity

  baseUrl = 'contract'

  async enforce(contract: ContractEntity) {
    return this.api('enforce').post(contract)
  }

  async stop(contract: ContractEntity) {
    return this.api('stop').post(contract)
  }
}
