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

  async getDevicePayloadHistory(item: CollectionEntity): Promise<CollectionEntity[]> {
    const jsonArray = await this.api('getDevicePayloadHistory').post(item)
    return CollectionEntity.fromJsonArray(jsonArray)
  }

  async getDeviceByUuid(uuid: string): Promise<DeviceEntity> {
    const device = new DeviceEntity()
    device.uuid = uuid
    const json = await this.api('getDevice').post(device)
    return DeviceEntity.fromJson(json)
  }
}
