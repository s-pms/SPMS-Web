import { ref, Ref } from 'vue'
import { AirWebsocketEvent } from '@/airpower/websocket/AirWebSocketEvent'
import { IJson } from '@/airpower/interface/IJson'
import { ChatEventType } from '@/model/chat/enum/ChatEventType'
import { AppConfig } from '@/config/AppConfig'
import { AirClassTransformer } from '@/airpower/helper/AirClassTransformer'
import AirEvent from '@/airpower/event/AirEvent'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirWebSocketPayload } from '@/airpower/websocket/AirWebSocketPayload'

/**
 * # 聊天事件Hook
 * @author Hamm.cn
 */
export function useChat(websocket: Ref<AirWebsocket | undefined>) {
  const input = ref('')
  /**
   * ## WebSocket事件转移
   * @param event 事件
   */
  const transferWebsocketEvent = (event: AirWebsocketEvent) => {
    let json: IJson
    const eventType = ChatEventType.get(event.payload.type)
    if (eventType?.eventModel && event.payload.data) {
      json = JSON.parse(event.payload.data)
      const data = AirClassTransformer.parse(json, eventType.eventModel)
      data.time = event.time
      data.id = event.id
      data.type = eventType.key
      AirEvent.emit(AppConfig.EVENT_PREFIX + event.payload.type, data)
      return
    }
    AirEvent.emit(AppConfig.EVENT_PREFIX + event.payload.type, event.payload.data)
  }

  /**
   * ## 发送消息
   */
  function sendTextMessage() {
    if (!input.value) {
      return
    }
    const temp = input.value
    input.value = ''
    if (!websocket.value?.isConnected) {
      return
    }
    const payload = new AirWebSocketPayload()
    payload.type = ChatEventType.ROOM_TEXT_MESSAGE.key
    payload.data = temp
    websocket.value.send(payload)
  }

  return { transferWebsocketEvent, sendTextMessage, input }
}
