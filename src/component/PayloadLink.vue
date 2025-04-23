<script generic="P extends IPayload" lang="ts" setup>
import type { IPayload } from '@airpower/web'
import type { Component } from 'vue'
import { DialogUtil } from '@airpower/web'

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
  DialogUtil.show(view, payload)
}
</script>

<template>
  <el-link @click="showDetail">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>

<style lang="scss" scoped></style>
