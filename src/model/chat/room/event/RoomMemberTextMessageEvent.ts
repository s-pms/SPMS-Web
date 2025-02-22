import { RoomMemberEvent } from '../model/RoomMemberEvent'

/**
 * # 房间用户文本消息事件
 * @author Hamm.cn
 */
export class RoomMemberTextMessageEvent extends RoomMemberEvent {
  /**
   * ## 文本消息
   */
  text!: string
}
