<script lang="ts" setup>
import { Bottom, ZoomIn } from '@element-plus/icons-vue'
import {
  nextTick, PropType, ref, Ref,
} from 'vue'
import { AirFile } from '@airpower/helper/AirFile'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import AirEvent from '@airpower/event/AirEvent'
import { ChatEventType } from '@/model/chat/enum/ChatEventType'
import { RoomMemberTextMessageEvent } from '@/model/chat/room/event/RoomMemberTextMessageEvent'
import { RoomMemberImageMessageEvent } from '@/model/chat/room/event/RoomMemberImageMessageEvent'
import ChatAvatar from '@/view/chat/components/ChatAvatar.vue'
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import { AppConfig } from '@/config/AppConfig'
import { useEmoji } from '@/model/chat/hook/useEmoji'
import SystemMessage from '@/view/chat/components/SystemMessage.vue'

defineProps({
  list: {
    type: Array as PropType<RoomMemberEvent[]>,
    default: () => [],
  },
})
const emits = defineEmits(['click'])

const messageList: Ref<RoomMemberEvent[]> = ref([])

const listDom = ref<HTMLDivElement>()

const isListScrollLocked = ref(false)

const {
  getEmojiUrl,
  decodeEmojis,
  MESSAGE_STRING,
  MESSAGE_EMOJI,
} = useEmoji()

function autoScroll() {
  if (isListScrollLocked.value) {
    return
  }
  if (!listDom.value) {
    return
  }
  isListScrollLocked.value = false
  nextTick(() => {
    listDom.value?.scrollTo({
      top: listDom.value.scrollHeight,
    })
  })
}

function onScroll() {
  // 如果滚动距离底部大于20
  if (!listDom.value) {
    return
  }
  isListScrollLocked.value = listDom.value.scrollTop + listDom.value.clientHeight < listDom.value.scrollHeight - 50
}

function getMessageClass(item: RoomMemberEvent) {
  const arr = []
  if (item.member.user.id === AppConfig.currentUser.value.id) {
    arr.push('from-me')
  }
  return arr.join(' ')
}

function openNewTab(url: string) {
  window.open(url)
}

AirEvent.onAll([
  AppConfig.EVENT_PREFIX + ChatEventType.ROOM_TEXT_MESSAGE.key,
  AppConfig.EVENT_PREFIX + ChatEventType.ROOM_MEMBER_JOIN.key,
  AppConfig.EVENT_PREFIX + ChatEventType.ROOM_MEMBER_LEAVE.key,
], (event: RoomMemberTextMessageEvent) => {
  messageList.value.push(event)
  autoScroll()
})

AirEvent.onAll([
  AppConfig.EVENT_PREFIX + ChatEventType.ROOM_JOIN_SUCCESS.key,
], () => {
  messageList.value = []
  autoScroll()
})

</script>

<template>
  <div
    class="list"
  >
    <div
      ref="listDom"
      class="history"
      @click="emits('click')"
      @scroll="onScroll"
    >
      <template
        v-for="item in messageList"
        :key="item.id"
      >
        <template
          v-if="[
            ChatEventType.ROOM_TEXT_MESSAGE.key,
            ChatEventType.ROOM_IMAGE_MESSAGE.key
          ].includes(item.type)"
        >
          <div
            :class="getMessageClass(item)"
            class="message"
          >
            <ChatAvatar :url="item.member.user.avatar" />
            <div class="content">
              <div class="nick copy">
                {{ item.member.user.nickname }}
              </div>
              <el-dropdown trigger="contextmenu">
                <div
                  v-if="ChatEventType.ROOM_TEXT_MESSAGE.equalsKey(item.type)"
                  class="text copy"
                >
                  <template
                    v-for="(tempItem, index) in decodeEmojis((item as RoomMemberTextMessageEvent).text)"
                    :key="index"
                  >
                    <template v-if="tempItem.type == MESSAGE_STRING">
                      {{ tempItem.str }}
                    </template>
                    <template v-if="tempItem.type ==MESSAGE_EMOJI">
                      <img :src="getEmojiUrl(tempItem.emoji)">
                    </template>
                  </template>
                </div>
                <div
                  v-if="ChatEventType.ROOM_IMAGE_MESSAGE.equalsKey(item.type)"
                  class="text img"
                >
                  <el-image
                    :src="AirFile.getStaticFileUrl((item as RoomMemberImageMessageEvent).img)"
                    fit="cover"
                    @load="autoScroll"
                  >
                    <template #error>
                      <div class="image-slot">
                        <i class="el-icon-picture-outline-round" />
                      </div>
                    </template>
                  </el-image>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-icon>
                        <Bottom />
                      </el-icon>
                      撤回消息
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="openNewTab((item as RoomMemberImageMessageEvent).img)"
                    >
                      <el-icon>
                        <ZoomIn />
                      </el-icon>
                      预览大图
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="time">
                {{ AirDateTime.getFriendlyDateTime(item.time) }}
              </div>
            </div>
          </div>
        </template>
        <SystemMessage
          v-if="[
            ChatEventType.ROOM_MEMBER_JOIN.key,
            ChatEventType.ROOM_MEMBER_LEAVE.key
          ].includes(item.type)"
          :message="item"
        />
      </template>
    </div>
    <el-button
      v-if="isListScrollLocked"
      class="scroll-button"
      size="small"
      @click="isListScrollLocked=false;autoScroll()"
    >
      到最新
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.list {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .history {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
    padding: 20px;
    position: relative;

    .message {
      display: flex;
      flex-direction: row;
      margin: 20px 0;
      text-align: left;
      padding-right: 60%;

      .content {
        margin-left: 20px;

        .nick {
          font-size: 15px;
          color: #666;
        }

        .text {
          user-select: all;
          background-color: #eee;
          font-size: 13px;
          color: #666;
          padding: 8px 16px;
          border-radius: 15px;
          margin-top: 10px;
          word-break: break-all;
          word-wrap: break-word;
          display: inline-block;
          position: relative;
          cursor: pointer;
          line-height: 18px;
          max-width: 300px;

          * {
            user-select: all;
          }

          img {
            width: 20px;
            height: 20px;
          }

          * {
            display: inline-block;
            vertical-align: middle;
          }
        }

        .text::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -13px;
          right: auto;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom: 12px currentColor;
          border-radius: 0 0 0 15px;
          color: #eee;
        }

        .img {
          padding: 2px;

          .el-image {
            border-radius: 15px;
            max-width: 200px;

            .el-image__inner {
              border-radius: 15px;
            }
          }
        }

        .time {
          font-size: 12px;
          color: #ccc;
          margin-top: 5px;
        }
      }
    }

    .from-me {
      justify-content: flex-end;
      flex-direction: row-reverse;
      text-align: right;
      padding-right: 0;
      padding-left: 60%;

      .content {
        margin-right: 20px;
        margin-left: auto;
        text-align: right;

        .nick {
          text-align: right;
        }

        .text {
          background-color: #1295dd;
          color: #fff;
          text-align: left;
        }

        .text::before {
          content: "";
          position: absolute;
          top: -5px;
          left: auto;
          right: -13px;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom: 12px currentColor;
          border-radius: 0 0 15px 0;
          color: #1295dd;
        }
      }

      .time {
        text-align: right;
      }
    }
  }

  .scroll-button {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
}

</style>
