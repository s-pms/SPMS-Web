<template>
  <ADialog
    :hide-footer="!mult"
    title="选择入库明细"
    is-selector
    width="70%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <ATable
      :data-list="list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="MoveDetailEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template #materialCode="row">
        {{ (row.data as MoveDetailEntity).material.code }}
      </template>
      <template #materialName="row">
        {{ (row.data as MoveDetailEntity).material.name }}
      </template>
      <template
        v-if="!mult"
        #customRow="{ data }"
      >
        <AButton
          type="SELECT"
          icon-button
          :disabled="data.isDisabled"
          tooltip="选择"
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ATable, ADialog, AButton,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'

const props = defineProps(airPropsSelector<MoveDetailEntity, MoveEntity>())

const isLoading = ref(false)
const list = ref([] as MoveDetailEntity[])

const selectList = ref(props.selectList)

function onSelected(data: MoveDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new MoveEntity())

async function getMove() {
  plan.value = await MoveService.create(isLoading).getDetail(props.param.id)
  list.value = plan.value.details
}

getMove()
</script>
<style scoped lang="scss"></style>
