<script generic="P extends IPayload" lang="ts" setup>
import type { IPayload } from '@airpower/interface/IPayload'
import type { Component } from 'vue'
import { AirDialog } from '@airpower/helper/AirDialog'

const { payload, view } = defineProps<{
  /**
   * ### 单据
   */
  payload: P

  /**
   * ### 单据详情页组件
   */
  view: Component
}>()

function showDetail() {
  AirDialog.show(view, payload)
}
</script>

<template>
  <el-link @click="showDetail">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>

<style lang="scss" scoped></style>
