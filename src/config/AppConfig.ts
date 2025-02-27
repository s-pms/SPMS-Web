import { Ref, ref } from 'vue'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { RoomEntity } from '@/model/chat/room/RoomEntity'
import { MemberEntity } from '@/model/chat/member/MemberEntity'

/**
 * # 应用配置
 *
 * @author Hamm.cn
 */
export class AppConfig {
  /**
   * ## 事件前缀
   */
  static readonly EVENT_PREFIX = 'event_'

  /**
   * ## 切换房间
   */
  static readonly CHANGE_ROOM = 'CHANGE_ROOM'

  /**
   * ## 当前登录的用户
   */
  static currentUser: Ref<UserEntity> = ref(new UserEntity())

  /**
   * ## 默认房间
   */
  static readonly defaultRoomCode = 666

  /**
   * ## 当前成员
   */
  static currentMember = ref(new MemberEntity())

  /**
   * ## 当前房间
   */
  static currentRoom = ref(new RoomEntity())

  /**
   * ## 房间ID缓存前缀
   */
  static readonly CACHE_KEY_LAST_ROOM = 'room_id'

  /**
   * ## 房间密码缓存前缀
   */
  static readonly CACHE_KEY_LAST_PASSWORD = 'room_password'

  /**
   * ## 获取上次房间编号
   */
  static getLastRoomCode() {
    return Number(localStorage.getItem(this.CACHE_KEY_LAST_ROOM)) || AppConfig.defaultRoomCode
  }

  /**
   * ## 保存上次房间编号
   * @param roomCode 房间编号
   */
  static saveLastRoomCode(roomCode: number) {
    localStorage.setItem(this.CACHE_KEY_LAST_ROOM, String(roomCode))
  }

  /**
   * ## 获取上次房间密码
   */
  static getLastRoomPassword() {
    return (localStorage.getItem(this.CACHE_KEY_LAST_PASSWORD) || '').toString()
  }

  /**
   * ## 保存上次房间密码
   * @param password 房间密码
   */
  static saveLastRoomPassword(password: string) {
    localStorage.setItem(this.CACHE_KEY_LAST_PASSWORD, password)
  }
}
