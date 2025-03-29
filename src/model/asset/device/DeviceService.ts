import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { DeviceEntity } from './DeviceEntity'

export class DeviceService extends AbstractBaseService<DeviceEntity> {
  entityClass = DeviceEntity

  baseUrl = 'device'

  async getCurrentReport(id: number): Promise<CollectionEntity[]> {
    return this.api('getCurrentReport').requestArray(new DeviceEntity(id), CollectionEntity)
  }

  async getDevicePayloadHistory(item: CollectionEntity): Promise<CollectionEntity[]> {
    return this.api('getDevicePayloadHistory').requestArray(item, CollectionEntity)
  }

  async getDeviceByUuid(uuid: string): Promise<DeviceEntity> {
    const device = new DeviceEntity()
    device.uuid = uuid
    return this.api('getDeviceConfig').request(device, DeviceEntity)
  }
}
