<script lang="ts" setup>
import type { RoomEntity } from '@/model/chat/room/RoomEntity'
import { RoomService } from '@/model/chat/room/RoomService'
import RoomList from '@/view/chat/dialog/list/RoomList.vue'
import MyRoomList from '@/view/chat/dialog/MyRoomList.vue'
import { AButton, ADialog } from '@airpower/component'
import { airProps } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import { ref } from 'vue'

const props = defineProps(airProps())

const hotRoomList = ref([] as RoomEntity[])

const isLoading = ref(false)

async function getHotRoomList() {
  hotRoomList.value = await RoomService.create(isLoading).getHotList()
}

async function showMyRoomList() {
  props.onConfirm()
  await AirDialog.show(MyRoomList)
}

getHotRoomList()
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :loading="isLoading"
    height="600px"
    hide-confirm
    title="热门房间"
    width="400px"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
  >
    <RoomList
      :room-list="hotRoomList"
      @join-room="onConfirm"
    />
    <template #middleButton>
      <AButton
        primary
        type="CHECKIN"
        @click="showMyRoomList"
      >
        我的房间
      </AButton>
    </template>
  </ADialog>
</template>

<style lang="scss" scoped></style>
