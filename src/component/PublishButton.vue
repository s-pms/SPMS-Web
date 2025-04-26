<script generic="E extends BaseEntity" lang="ts" setup>
import type { BaseEntity } from '@/base/BaseEntity'
import { AButton } from '@airpower/web'

const { data } = defineProps<{
  /**
   * ### 实体
   */
  data: E
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <AButton
    :disabled="data.isPublished"
    link
    @click="emits('click', data)"
  >
    发布
  </AButton>
</template>

<style lang="scss" scoped></style>
