<template>
  <ADialog
    :allow-fullscreen="false"
    :loading="isLoading"
    height="600px"
    hide-confirm
    title="我的房间"
    width="400px"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
  >
    <template #middleButton>
      <AButton
        primary
        type="ADD"
        @click="onAdd"
      >
        创建房间
      </AButton>
    </template>
    <RoomList
      :room-list="myRoomList"
      @join-room="onConfirm"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AButton, ADialog } from '@airpower/component'
import { airProps } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import CreateRoom from './CreateRoom.vue'
import { RoomEntity } from '@/model/chat/room/RoomEntity'
import { RoomService } from '@/model/chat/room/RoomService'
import RoomList from '@/view/chat/dialog/list/RoomList.vue'

defineProps(airProps())

const myRoomList = ref([] as RoomEntity[])

const isLoading = ref(false)

async function getMyRoomList() {
  myRoomList.value = await RoomService.create(isLoading).getMyRoomList()
}

async function onAdd() {
  await AirDialog.show(CreateRoom)
  await getMyRoomList()
}

getMyRoomList()
</script>

<style lang="scss" scoped>
</style>
