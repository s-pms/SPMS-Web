<script lang="ts" setup>
import { AButton, ADialog, ATable, DialogProps } from '@airpower/web'

import { ref } from 'vue'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'

const props = defineProps(DialogProps.withSelector<PurchaseDetailEntity, PurchaseEntity>())

const isLoading = ref(false)
const list = ref<PurchaseDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: PurchaseDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PurchaseEntity())

async function getDetail() {
  plan.value = await PurchaseService.create(isLoading).getDetail(props.param.id)
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
    title="选择采购明细"
    width="70%"
    @cancel="onCancel"
    @confirm="onConfirm(selectList)"
  >
    <ATable
      :data-list="list"
      :entity="PurchaseDetailEntity"
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
