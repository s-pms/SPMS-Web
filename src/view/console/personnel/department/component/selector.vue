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
    @cancel="onCancel"
    @confirm="onConfirm(selectList)"
  >
    <ATable
      :data-list="list"
      :entity="DepartmentEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :service="DepartmentService"
      :show-select="isMultiple"
      :tree-props="{
        checkStrictly: true,
      }"
      ctrl-width="80"
      hide-add
      hide-column-selector
      hide-delete
      hide-edit
      @search="onSearch"
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
          作业
        </AButton>
      </template>
    </ATable>
  </ADialog>
</template>

<style lang="scss" scoped></style>
