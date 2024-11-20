<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    is-selector
    title="选择计划明细"
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <ATable
      :ctrl-width="80"
      :data-list="list"
      :entity="PlanDetailEntity"
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
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'

const props = defineProps(airPropsSelector<PlanDetailEntity, PlanEntity>())

const isLoading = ref(false)
const list = ref<PlanDetailEntity[]>([])

const selectList = ref(props.selectList)

function onSelected(data: PlanDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PlanEntity())

async function getPlan() {
  plan.value = await PlanService.create(isLoading)
    .getDetail(props.param.id)
  list.value = plan.value.details
}

getPlan()
</script>
<style lang="scss" scoped></style>
