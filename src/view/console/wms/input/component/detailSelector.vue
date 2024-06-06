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
      :entity="InputDetailEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template #materialCode="row">
        {{ row.data.material.code }}
      </template>
      <template #materialName="row">
        {{ row.data.material.name }}
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
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'

const props = defineProps(airPropsSelector<InputDetailEntity, InputEntity>())

const isLoading = ref(false)
const list = ref<InputDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: InputDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new InputEntity())

async function getInput() {
  plan.value = await InputService.create(isLoading).getDetail(props.param.id)
  list.value = plan.value.details
}

getInput()
</script>
<style scoped lang="scss"></style>
