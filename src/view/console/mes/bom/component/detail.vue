<script lang="ts" setup>
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { InputEntity } from '@/model/wms/input/InputEntity'

import { ADialog, AFormField, AGroup, ATable, DialogProps, getTableConfigList, useDetail } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new InputEntity()))

const {
  title,
  formData,
  isLoading,
} = useDetail(props, BomService, {})
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="70%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="配方信息"
      >
        <AFormField
          disabled
          field="code"
        />
        <AFormField
          disabled
          field="name"
        />
        <AFormField
          disabled
          field="type"
        />
      </AGroup>
      <AGroup title="配方物料清单">
        <ATable
          :data-list="formData.details"
          :entity="BomDetailEntity"
          :column-list="getTableConfigList(BomDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          ctrl-width="80"
          hide-add
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
