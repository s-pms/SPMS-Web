<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择申领明细"
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <ATable
      :ctrl-width="80"
      :data-list="list"
      :entity="PickingDetailEntity"
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
import { AButton, ADialog, ATable } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'

const props = defineProps(airPropsSelector<PickingDetailEntity, PickingEntity>())

const isLoading = ref(false)
const list = ref<PickingDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: PickingDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PickingEntity())

async function getDetail() {
  plan.value = await PickingService.create(isLoading)
    .getDetail(props.param.id)
  list.value = plan.value.details
}

getDetail()
</script>
<style lang="scss" scoped></style>
