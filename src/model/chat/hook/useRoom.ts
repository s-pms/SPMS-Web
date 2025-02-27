import { Ref, ref } from 'vue'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AppConfig } from '@/config/AppConfig'
import { AirWebSocketPayload } from '@/airpower/websocket/AirWebSocketPayload'
import { ChatEventType } from '@/model/chat/enum/ChatEventType'
import { RoomJoinRequest } from '@/model/chat/room/model/RoomJoinRequest'
import AirEvent from '@/airpower/event/AirEvent'
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import { RoomService } from '@/model/chat/room/RoomService'
import { AirAlert } from '@/airpower/feedback/AirAlert'

/**
 * # 房间Hook
 * @param websocket WebSocket
 * @param currentRoomChanged 房间变更
 * @author Hamm.cn
 */
export function useRoom(websocket: Ref<AirWebsocket | undefined>, currentRoomChanged?: () => void) {
  /**
   * ## 是否在房间中
   */
  const isInRoom = ref(false)

  /**
   * ## 加入房间
   * @param roomCode 房间编号
   * @param password 房间密码
   */
  function joinRoom(roomCode?: number, password?: string) {
    if (!websocket.value) {
      AirNotification.error('WebSocket未连接')
      isInRoom.value = false
      return
    }
    if (!roomCode) {
      roomCode = AppConfig.getLastRoomCode()
    }
    if (!password) {
      password = AppConfig.getLastRoomPassword()
    }
    const payload = new AirWebSocketPayload()
    payload.type = ChatEventType.ROOM_MEMBER_JOIN.key
    const request = new RoomJoinRequest()
    request.roomCode = roomCode
    request.password = password
    payload.data = JSON.stringify(request.toJson())
    websocket.value.send(payload)
  }

  // 进入房间成功
  AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_JOIN_SUCCESS.key, async (event: RoomMemberEvent) => {
    AppConfig.saveLastRoomCode(event.member.room.code)
    AppConfig.currentMember.value = event.member
    AppConfig.currentRoom.value = await RoomService.create()
      .getDetail(AppConfig.currentMember.value.room.id)
    if (currentRoomChanged) {
      currentRoomChanged()
    }
    isInRoom.value = true
  })

  // 进入房间失败 重新进入默认房间
  AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_JOIN_FAIL.key, async (reason: string) => {
    await AirAlert.error(reason, '进入失败')
    AppConfig.saveLastRoomPassword('')
    joinRoom(AppConfig.defaultRoomCode)
  })

  AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_LEAVE_SUCCESS.key, () => {
    isInRoom.value = false
    joinRoom(AppConfig.getLastRoomCode())
  })

  AirEvent.on(AppConfig.CHANGE_ROOM, () => {
    const payload = new AirWebSocketPayload()
    payload.type = ChatEventType.ROOM_MEMBER_LEAVE.key
    websocket.value?.send(payload)
  })

  return {
    isInRoom,
    joinRoom,
  }
}
