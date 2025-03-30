import { AbstractBaseService } from '@/base/AbstractBaseService'
import { RoomEntity } from './RoomEntity'

/**
 * # 房间服务
 * @author Hamm.cn
 */
export class RoomService extends AbstractBaseService<RoomEntity> {
  entityClass = RoomEntity

  baseUrl = 'room'

  /**
   * ## 获取热门房间
   * @returns 热门房间
   */
  async getHotList(): Promise<RoomEntity[]> {
    const json = await this.api('getHotList').post()
    return RoomEntity.fromJsonArray(json)
  }

  /**
   * ## 获取我的房间列表
   * @returns 我的房间列表
   */
  async getMyRoomList(): Promise<RoomEntity[]> {
    const json = await this.api('getMyRoomList').post()
    return RoomEntity.fromJsonArray(json)
  }

  /**
   * ## 创建房间
   * @param room 房间
   * @returns 房间ID
   */
  async createRoom(room: RoomEntity): Promise<number> {
    const json = await this.api('create').post(room)
    return RoomEntity.fromJson(json).id
  }
}
