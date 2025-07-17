<script lang="ts" setup>
import { AButton, ADialog, ATable, DialogProps } from '@airpower/web'

import { ref } from 'vue'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'

const props = defineProps(DialogProps.withSelector<InputDetailEntity, InputEntity>())

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

<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择入库明细"
    width="70%"
    @cancel="onCancel"
    @confirm="onConfirm(selectList)"
  >
    <ATable
      :data-list="list"
      :entity="InputDetailEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      ctrl-width="80"
      hide-column-selector
      hide-delete
      hide-edit
      @select-changed="onSelected"
    >
      <template #materialCode="{ data }">
        {{ data.material.code }}
      </template>
      <template #materialName="{ data }">
        {{ data.material.name }}
      </template>
      <template
        v-if="!isMultiple"
        #customRow="{ data }"
      >
        <AButton
          :disabled="data.isDisabled"
          link
          @click="onConfirm(data)"
        >
          选择
        </AButton>
      </template>
    </ATable>
  </ADialog>
</template>

<style lang="scss" scoped></style>
