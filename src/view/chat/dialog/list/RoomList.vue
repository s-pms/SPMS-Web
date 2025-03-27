<template>
  <div
    v-if="roomList.length > 0"
    class="room-list"
  >
    <div
      v-for="room in roomList"
      :key="room.id"
      class="room"
      @click="onRoomClick(room)"
    >
      <div class="room-title">
        <div class="id">
          {{ room.code }}
        </div>
        <div class="name">
          {{ room.name }}
        </div>
        <div
          v-if="room.isOfficial"
          class="official"
        >
          官方
        </div>
      </div>
      <div class="room-desc">
        {{ room.description || "房主还没有填写介绍~" }}
      </div>
    </div>
  </div>
  <AEmpty v-else>
    糟糕，你还没有创建房间哦～
  </AEmpty>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AEmpty } from '@airpower/component'
import AirEvent from '@airpower/event/AirEvent'
import { RoomEntity } from '@/model/chat/room/RoomEntity'
import { AppConfig } from '@/config/AppConfig'

defineProps({
  roomList: {
    type: Array as PropType<RoomEntity[]>,
    default: () => [],
  },
})

const emits = defineEmits(['joinRoom'])

function emitJoinRoom(room: RoomEntity) {
  emits('joinRoom', room)
}

async function onRoomClick(room: RoomEntity) {
  if (AppConfig.getLastRoomCode() !== room.code) {
    await AirConfirm.warning('是否确认切换房间？', '进入房间')
    if (!room.isPrivate || AppConfig.getLastRoomPassword()) {
      // 无需密码或者本地存储了密码或者是房主和管理员
      AppConfig.saveLastRoomCode(room.code)
      AirEvent.emit(AppConfig.CHANGE_ROOM)
      emitJoinRoom(room)
      return
    }
    // todo 查询自己在那个房间的身份，如果是成员或者游客，则需要输入密码
  }
  emitJoinRoom(room)
}
</script>
<style lang="scss" scoped>
.room-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  overflow-y: auto;

  .room {
    background: #f8f8f8;
    padding: 15px 20px;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
    cursor: pointer;
    transition: all .3s;
    margin-bottom: 10px;

    .room-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: bold;
      font-size: 16px;

      .official {
        margin-right: 5px;
        background-color: orangered;
        color: white;
        font-size: 12px;
        padding: 2px 5px;
        border-radius: 5px;
        font-weight: normal;
      }

      .id {
        background-color: #000;
        font-size: 14px;
        border-radius: 5px;
        font-weight: bold;
        margin-right: 5px;
        overflow: hidden;
        position: relative;
        padding: 1px 5px 1px 22px;
        color: #fff;
      }

      .id::before {
        content: 'ID';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 1px 5px;
        background-color: transparent;
      }

      .name {
        flex: 1;
        width: 0;
      }
    }

    .room-desc {
      margin-top: 10px;
      font-size: 14px;
      color: #999;
    }
  }

  .room:hover {
    background-color: #e8e8e8;
    border: 1px solid #e5e5e5;
  }
}
</style>
