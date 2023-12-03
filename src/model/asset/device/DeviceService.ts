import { AbstractBaseService } from '@/base/AbstractBaseService'
import { DeviceEntity } from './DeviceEntity'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'

export class DeviceService extends AbstractBaseService<DeviceEntity> {
  entityClass = DeviceEntity

  baseUrl = 'device'

  async getCollectionList(id: number): Promise<CollectionEntity[]> {
    const jsonArray = await this.api('getCurrentCollectionList').post(new DeviceEntity(id))
    return CollectionEntity.fromJsonArray(jsonArray)
  }
}
