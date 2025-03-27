<script lang="ts" setup>
import { ref, Ref } from 'vue'
import AirEvent from '@airpower/event/AirEvent'
import { DialogStatus } from '@/model/chat/DialogStatus'
import { AppConfig } from '@/config/AppConfig'
import UserCard from '@/component/UserCard.vue'
import { ChatEventType } from '@/model/chat/enum/ChatEventType'

function copyToClipboard() {
}

function getIfCanModifyRoom() {
  return true
}

const onlineList: Ref<number[]> = ref([])

const emits = defineEmits(['open'])

AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ONLINE_COUNT_CHANGED.key, (event: string) => {
  onlineList.value = JSON.parse(event)
})
</script>

<template>
  <div
    v-if="AppConfig.currentRoom.value.id"
    class="top"
  >
    <div class="room-info keep-1-line">
      <div
        class="room-id copy"
      >
        ID:{{ AppConfig.currentRoom.value.code }}
      </div>
      <div class="room-name copy">
        {{ AppConfig.currentRoom.value.name }}
      </div>
      <div
        class="room-left-menu copy-button"
        @click="copyToClipboard"
      >
        <i class="iconfont icon-fenxiang" />
        <span>分享</span>
      </div>
    </div>

    <div class="room-right">
      <div
        v-if="getIfCanModifyRoom()"
        class="room-right-menu room-exit"
        @click="emits('open',DialogStatus.ROOM_SETTING)"
      >
        <i class="iconfont icon-changyongtubiao-mianxing-29" /><span>管理</span>
      </div>
      <div
        class="room-right-menu room-exit"
        @click="emits('open',DialogStatus.ONLINE)"
      >
        <i class="iconfont icon-icon_people_fill" /><span>在线({{ onlineList.length }})</span>
      </div>
      <div
        class="room-right-menu room-exit"
        @click="emits('open',DialogStatus.ROOM_LIST)"
      >
        <i class="iconfont icon-icon_addresslist_fil" /><span>房间</span>
      </div>
      <UserCard
        :user="AppConfig.currentUser.value"
        style="margin-left: 10px"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 0 15px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  .room-info {
    display: flex;
    flex-direction: row;
    flex: 1;
    width: 0;
    align-items: center;
    font-size: 18px;

    .room-id {
      background-color: #333;
      color: white;
      padding: 0 5px;
      font-size: 14px;
      border-radius: 3px;
      margin-right: 5px;
    }

    .room-left-menu {
      padding: 5px 15px;
      font-size: 13px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      margin-left: 5px;

      .iconfont {
        margin-right: 2px;
      }
    }

    .room-left-menu:hover {
      background-color: #eee;
    }
  }

  .room-right {
    font-size: 14px;
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 20px;

    .room-right-menu {
      padding: 5px 10px;
      font-size: 13px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        margin-right: 2px;
      }
    }

    .room-right-menu:hover {
      background-color: #eee;
    }
  }
}
</style>
