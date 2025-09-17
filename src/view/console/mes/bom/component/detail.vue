<script lang="ts" setup>
import { ADialog, AFormField, AGroup, ATable, DialogProps, getTableConfigList, useDetail } from '@airpower/web'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { InputEntity } from '@/model/wms/input/InputEntity'

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
          :column-list="getTableConfigList(BomDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          :data-list="formData.details"
          :entity="BomDetailEntity"
          ctrl-width="80"
          hide-add
          hide-delete
          hide-edit
        />
      </AGroup>
    </el-form>
  </ADialog>
</template>
