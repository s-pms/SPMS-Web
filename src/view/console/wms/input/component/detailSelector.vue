<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择入库明细"
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <ATable
      :ctrl-width="80"
      :data-list="list"
      :entity="InputDetailEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      hide-delete
      hide-edit
      hide-field-selector
      @on-select="onSelected"
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
          icon-button
          tooltip="选择"
          type="SELECT"
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
import { AButton, ADialog, ATable } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
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
  plan.value = await InputService.create(isLoading)
    .getDetail(props.param.id)
  list.value = plan.value.details
}

getInput()
</script>
<style lang="scss" scoped></style>
