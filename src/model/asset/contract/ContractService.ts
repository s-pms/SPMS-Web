import { AbstractBaseService } from '@/base/AbstractBaseService'
import { ContractEntity } from './ContractEntity'

export class ContractService extends AbstractBaseService<ContractEntity> {
  entityClass = ContractEntity

  baseUrl = 'contract'

  async enforce(contract: ContractEntity): Promise<void> {
    await this.api('enforce').request(contract)
  }

  async stop(contract: ContractEntity): Promise<void> {
    await this.api('stop').request(contract)
  }
}
