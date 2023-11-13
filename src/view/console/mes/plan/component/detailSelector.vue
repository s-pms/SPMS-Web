<template>
  <ADialog
    :hide-footer="!mult"
    title="选择计划明细"
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
      :entity="PlanDetailEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template #materialCode="row">
        {{ (row.data as PlanDetailEntity).material.code }}
      </template>
      <template #materialName="row">
        {{ (row.data as PlanDetailEntity).material.name }}
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
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'

const props = defineProps(airPropsSelector<PlanDetailEntity, PlanEntity>())

const isLoading = ref(false)
const list = ref([] as PlanDetailEntity[])

const selectList = ref(props.selectList)

function onSelected(data: PlanDetailEntity[]) {
  selectList.value = data
}

const plan = ref(new PlanEntity())

async function getPlan() {
  plan.value = await PlanService.create(isLoading).getDetail(props.param.id)
  list.value = plan.value.details
}

getPlan()
</script>
<style scoped lang="scss"></style>
