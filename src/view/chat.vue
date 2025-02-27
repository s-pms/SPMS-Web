<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { AppConfig } from '@/config/AppConfig'
import { UserService } from '@/model/personnel/user/UserService'
import { DialogStatus } from '@/model/chat/DialogStatus'
import Emoji from '@/view/chat/panel/Emoji.vue'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirConfig } from '@/airpower/config/AirConfig'
import { useRoom } from '@/model/chat/hook/useRoom'
import { useChat } from '@/model/chat/hook/useChat'
import RoomChatList from '@/view/chat/components/RoomChatList.vue'
import ChatFormTool from '@/view/chat/components/ChatFormTool.vue'
import RoomTop from '@/view/chat/components/RoomTop.vue'
import { AirDialog } from '@/airpower/helper/AirDialog'
import HotRoomList from '@/view/chat/dialog/HotRoomList.vue'
import { RoomEntity } from '@/model/chat/room/RoomEntity'

const isLoading = ref(false)

const websocket: Ref<AirWebsocket | undefined> = ref()

const dialogStatus = ref(DialogStatus.NONE)

const messageDom = ref<HTMLTextAreaElement | null>(null)

const { transferWebsocketEvent, sendTextMessage, input } = useChat(websocket)

const { joinRoom } = useRoom(websocket)

async function init() {
  AppConfig.currentUser.value = await UserService.create(isLoading)
    .getMyInfo()

  websocket.value = AirWebsocket.create(`${AirConfig.websocketUrl}?${AirConfig.getAccessToken()}`, {
    onConnect() {
      joinRoom()
    },
    onMessage(event) {
      // 将 WebSocket 事件传到项目的 事件中心
      transferWebsocketEvent(event)
    },
  })
}

init()

async function openPanel(what?: DialogStatus) {
  dialogStatus.value = what || DialogStatus.NONE
  if (what) {
    if (DialogStatus.ROOM_LIST.equalsKey(what.key)) {
      await AirDialog.show<RoomEntity>(HotRoomList)
    }
  }
}

function keydown(e: KeyboardEvent) {
  openPanel()
  switch (e.key) {
    case 'Enter':
      sendTextMessage()
      openPanel()
      e.preventDefault()
      break
    default:
  }
}

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}
</script>
<template>
  <div
    v-loading="!AppConfig.currentUser"
    class="chat"
    @contextmenu="onContextMenu"
  >
    <div
      class="chat-body"
    >
      <RoomTop
        @open="openPanel($event)"
      />
      <div class="message">
        <RoomChatList
          @click="openPanel"
        />

        <div class="chat-form">
          <ChatFormTool @open="openPanel($event)" />
          <div class="chat-input">
            <textarea
              ref="messageDom"
              v-model="input"
              placeholder=""
              @click="openPanel()"
              @keydown="keydown"
            />
          </div>
        </div>
      </div>
      <transition-group name="slide">
        <!--        <RoomList-->
        <!--          v-if="dialogs.roomList && myInfo"-->
        <!--          :key="roomList"-->
        <!--          :user-info="myInfo"-->
        <!--          @update="confirmToChangeRoom"-->
        <!--          @create-room="hideTo('roomCreate')"-->
        <!--          @return2-my-room="changeToMyRoom"-->
        <!--        />-->
        <!--        <Online-->
        <!--          v-if="dialogs.online && roomInfo && myInfo"-->
        <!--          :key="online"-->
        <!--          :online-list="onlineList"-->
        <!--          :room-info="roomInfo"-->
        <!--          :user-info="myInfo"-->
        <!--          @at="atUser"-->
        <!--          @profile="showUserProfile"-->
        <!--        />-->
        <!--        <RoomSetting-->
        <!--          v-if="dialogs.roomSetting"-->
        <!--          :key="roomSetting"-->
        <!--          :room_id="room_id"-->
        <!--          @update="hideTo"-->
        <!--        />-->
        <!--        <RoomCreate-->
        <!--          v-if="dialogs.roomCreate"-->
        <!--          :key="roomCreate"-->
        <!--          @close="hideTo"-->
        <!--          @created="-->
        <!--            getMyInfo(() => {-->
        <!--              changeToMyRoom();-->
        <!--            })-->
        <!--          "-->
        <!--        />-->
        <Emoji
          v-if="DialogStatus.EMOJI.equalsKey(dialogStatus.key)"
          @click="input+= `[emoji${$event}]`;messageDom?.focus()"
        />
        <!--        <Profile-->
        <!--          v-if="dialogs.profile"-->
        <!--          :key="profile"-->
        <!--          :user-id="profileUserId"-->
        <!--          @close="hideTo"-->
        <!--        />-->
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  user-select: none;

  * {
    user-select: none;
  }

  .chat-body {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .message {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 0;

      .chat-form {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        position: relative;

        .progress {
          height: 2px;
          position: relative;

          div {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            border-radius: 10px;
            background: #fff;
            background: -webkit-linear-gradient(to left, #4493d7, #ffffff);
            background: linear-gradient(to left, #4493d7, #ffffff);
          }
        }

        .chat-input {
          padding: 0 10px 10px 18px;
          overflow: hidden;
          position: relative;

          textarea {
            height: 80px;
            width: 100%;
            resize: none;
            outline: none;
            border: none;
            font-size: 13px;
            background-color: transparent;
          }

          .lrc {
            font-size: 12px;
            color: #ccc;
            display: flex;
            flex-direction: row;

            .iconfont {
              color: #999;
              margin-right: 3px;
            }
          }
        }

        .chat-bottom {
          display: flex;
          flex-direction: row;
          position: relative;
        }
      }
    }
  }

  .highest {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    .volume {
      pointer-events: auto;
      display: flex;
      flex-direction: row;
      background-color: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(20px);
      color: #999;
      padding: 50px;
      border-radius: 20px;
      align-items: center;

      .iconfont {
        font-size: 88px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      span {
        font-size: 64px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
