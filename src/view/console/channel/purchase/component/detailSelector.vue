<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择采购明细"
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <ATable
      :ctrl-width="80"
      :data-list="list"
      :entity="PurchaseDetailEntity"
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
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'

const props = defineProps(airPropsSelector<PurchaseDetailEntity, PurchaseEntity>())

const isLoading = ref(false)
const list = ref<PurchaseDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: PurchaseDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PurchaseEntity())

async function getDetail() {
  plan.value = await PurchaseService.create(isLoading)
    .getDetail(props.param.id)
  list.value = plan.value.details
}

getDetail()
</script>
<style lang="scss" scoped></style>
