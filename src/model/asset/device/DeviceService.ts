import { AbstractBaseService } from '@/base/AbstractBaseService'
import { DeviceEntity } from './DeviceEntity'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'

export class DeviceService extends AbstractBaseService<DeviceEntity> {
  entityClass = DeviceEntity

  baseUrl = 'device'

  async getCurrentReport(id: number): Promise<CollectionEntity[]> {
    const jsonArray = await this.api('getCurrentReport').post(new DeviceEntity(id))
    return CollectionEntity.fromJsonArray(jsonArray)
  }
}
