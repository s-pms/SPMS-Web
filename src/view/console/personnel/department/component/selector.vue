<script lang="ts" setup>
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'
import { AButton, ADialog, ATable, DialogProps, useSelector } from '@airpower/web'

const props = defineProps(DialogProps.withSelector<DepartmentEntity>())

const {
  title,
  selectList,
  isLoading,
  list,
  onSearch,
  onSelected,
} = useSelector(props, DepartmentService, {
  unPaginate: true,
})
</script>

<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    :title="title"
    height="70%"
    is-selector
    width="70%"
    @confirm="onConfirm(selectList)"
    @cancel="onCancel"
  >
    <ATable
      :service="DepartmentService"
      hide-add
      @search="onSearch"
      ctrl-width="80"
      :data-list="list"
      :entity="DepartmentEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      :tree-props="{
        checkStrictly: true,
      }"
      hide-delete
      hide-edit
      hide-field-selector
      @select-changed="onSelected"
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
          @click="onConfirm(data)"
        />
      </template>
    </ATable>
  </ADialog>
</template>

<style lang="scss" scoped></style>
