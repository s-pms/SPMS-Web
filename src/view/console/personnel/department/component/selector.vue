<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    :title="title"
    height="70%"
    is-selector
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <AToolBar
      :entity="DepartmentEntity"
      :loading="isLoading"
      :service="DepartmentService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      :ctrl-width="80"
      :data-list="list"
      :entity="DepartmentEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      :tree-props="{
        checkStrictly:true
      }"
      hide-delete
      hide-edit
      hide-field-selector
      @on-select="onSelected"
    >
      <template
        v-if="!isMultiple"
        #customRow="{ data }"
      >
        <AButton
          :disabled="data.isDisabled"
          icon-button
          tooltip="选择"
          type="SELECT"
          @click=" onConfirm(data)"
        />
      </template>
    </ATable>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, ATable, AToolBar,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

const props = defineProps(airPropsSelector<DepartmentEntity>())

const {
  title,
  selectList,
  isLoading,
  list,
  onSearch,
  onSelected,
} = useAirSelector(props, DepartmentEntity, DepartmentService, {
  unPaginate: true,
})

</script>
<style lang="scss" scoped></style>
