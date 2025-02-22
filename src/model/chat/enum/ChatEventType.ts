import { AirEnum } from '@/airpower/base/AirEnum'
import { RoomMemberJoinEvent } from '@/model/chat/room/event/RoomMemberJoinEvent'
import { RoomMemberLeaveEvent } from '@/model/chat/room/event/RoomMemberLeaveEvent'
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import { ClassConstructor } from '@/airpower/type/AirType'
import { ChatEvent } from '@/model/chat/common/ChatEvent'
import { RoomMemberTextMessageEvent } from '@/model/chat/room/event/RoomMemberTextMessageEvent'
import { RoomMemberImageMessageEvent } from '@/model/chat/room/event/RoomMemberImageMessageEvent'

/**
 * # 世界事件类型
 * @author Hamm.cn
 */
export class ChatEventType extends AirEnum<string> {
  static readonly UNKNOWN = new ChatEventType('0', '未知')

  static readonly ONLINE = new ChatEventType('1', '上线')

  static readonly OFFLINE = new ChatEventType('2', '下线')

  static readonly ROOM_MEMBER_JOIN = new ChatEventType('1001', '加入房间', RoomMemberJoinEvent)

  static readonly ROOM_MEMBER_LEAVE = new ChatEventType('1002', '离开房间', RoomMemberLeaveEvent)

  static readonly ROOM_JOIN_FAIL = new ChatEventType('1003', '加入房间失败')

  static readonly ROOM_JOIN_SUCCESS = new ChatEventType('1004', '加入房间成功', RoomMemberEvent)

  static readonly ROOM_LEAVE_SUCCESS = new ChatEventType('1005', '离开房间成功')

  static readonly ONLINE_COUNT_CHANGED = new ChatEventType('1050', '在线人数变更')

  static readonly ROOM_LEAVE_FAIL = new ChatEventType('1006', '离开房间失败')

  static readonly ROOM_TEXT_MESSAGE = new ChatEventType('1100', '房间文本消息', RoomMemberTextMessageEvent)

  static readonly ROOM_IMAGE_MESSAGE = new ChatEventType('1101', '房间图片消息', RoomMemberImageMessageEvent)

  eventModel!: ClassConstructor<ChatEvent>

  constructor(key: string, label: string, eventModel?: ClassConstructor<ChatEvent>) {
    super(key, label)
    if (eventModel) {
      this.eventModel = eventModel
    }
  }
}
