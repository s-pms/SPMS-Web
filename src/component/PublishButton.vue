<script generic="E extends BaseEntity" lang="ts" setup>
import { AButton } from '@/airpower/component'
import { BaseEntity } from '@/base/BaseEntity'

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
    link-button
    @click="emits('click', data)"
  >
    发布
  </AButton>
</template>

<style lang="scss" scoped></style>
