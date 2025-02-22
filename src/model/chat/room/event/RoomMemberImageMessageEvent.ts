import { RoomMemberEvent } from '../model/RoomMemberEvent'

/**
 * # 房间用户图片消息事件
 * @author Hamm.cn
 */
export class RoomMemberImageMessageEvent extends RoomMemberEvent {
  /**
   * ## 图片
   */
  img!: string
}
