<script lang="ts" setup>
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import { ChatEventType } from '@/model/chat/enum/ChatEventType'
import { UserEntity } from '@/model/personnel/user/UserEntity'

defineProps({
  message: {
    type: RoomMemberEvent,
    required: true,
  },
})

function openUser(user: UserEntity) {
  console.log(user)
}
</script>

<template>
  <div class="system">
    <template v-if="ChatEventType.ROOM_MEMBER_JOIN.equalsKey(message.type)">
      <div>
        <span
          class="user"
          @click="openUser(message.member.user)"
        >{{ message.member.user.nickname }}</span>
        进入了房间
      </div>
    </template>
    <template v-if="ChatEventType.ROOM_MEMBER_LEAVE.equalsKey(message.type)">
      <div>
        <span
          class="user"
          @click="openUser(message.member.user)"
        >{{ message.member.user.nickname }}</span>
        离开了房间
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>

.system {
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 0 20%;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;

  div {
    background-color: #eee;
    padding: 2px 8px;
    border-radius: 3px;
    max-width: 500px;
  }

  .user {
    cursor: pointer;
  }

  .user:hover {
    color: orangered;
  }
}
</style>
