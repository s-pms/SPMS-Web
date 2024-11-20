<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="num <= 0"
    confirm-text="添加完成"
    min-height="200px"
    title="添加完成数量"
    @on-confirm="onConfirm(num)"
    @on-cancel="onCancel"
  >
    <el-input
      v-model="num"
      clearable
      placeholder="请输入本次完成数量..."
      type="number"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'

const props = defineProps(Object.assign(airProps(), {
  /**
   * # 添加完成数量
   */
  param: {
    type: Number,
    default: 0,
  },
}))

const num = ref(props.param)

</script>
