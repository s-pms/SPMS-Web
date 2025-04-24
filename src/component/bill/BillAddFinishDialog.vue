<script lang="ts" setup>
import { ADialog, DialogProps } from '@airpower/web'
import { ref } from 'vue'

const props = defineProps(
  Object.assign(DialogProps.create(), {
    /**
     * ### 添加完成数量
     */
    param: {
      type: Number,
      default: 0,
    },
  }),
)

const num = ref(props.param)
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="num <= 0"
    confirm-text="添加完成"
    min-height="200px"
    title="添加完成数量"
    @confirm="onConfirm(num)"
    @cancel="onCancel"
  >
    <el-input
      v-model="num"
      clearable
      placeholder="请输入本次完成数量..."
      type="number"
    />
  </ADialog>
</template>
