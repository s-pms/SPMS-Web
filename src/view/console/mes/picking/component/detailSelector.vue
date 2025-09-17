<script lang="ts" setup>
import { AButton, ADialog, ATable, DialogProps } from '@airpower/web'
import { ref } from 'vue'
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'

const props = defineProps(DialogProps.withSelector<PickingDetailEntity, PickingEntity>())

const isLoading = ref(false)
const list = ref<PickingDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: PickingDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PickingEntity())

async function getDetail() {
  plan.value = await PickingService.create(isLoading).getDetail(props.param.id)
  list.value = plan.value.details
}

getDetail()
</script>

<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择申领明细"
    width="70%"
    @cancel="onCancel"
    @confirm="onConfirm(selectList)"
  >
    <ATable
      :data-list="list"
      :entity="PickingDetailEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      ctrl-width="80"
      hide-column-selector
      hide-delete
      hide-edit
      @selected="onSelected"
    >
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
