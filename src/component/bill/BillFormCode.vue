<script generic="D extends AbstractBaseBillDetailEntity, B extends AbstractBaseBillEntity<D>" lang="ts" setup>
import type { PropType, Ref } from 'vue'
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { ACopy, AFormField } from '@airpower/web'
import { inject, ref } from 'vue'

const { modelValue } = defineProps({
  /**
   * ### 手动绑定的表单对象
   */
  modelValue: {
    type: Object as PropType<B>,
    default: null,
  },
})

const injectFormData = inject('formData') as Ref<B> | undefined

// 手动绑定的 v-model 覆盖 自动注入的表单对象
const formData = ref(modelValue) as Ref<B>
if (injectFormData && injectFormData.value) {
  formData.value = injectFormData.value
}
if (!formData.value) {
  throw new Error('请手动为 formData 绑定v-model或使用useEditor创建表单对象(推荐)！！！')
}
</script>

<template>
  <AFormField field="billCode">
    <ACopy
      v-if="formData.id"
      :content="formData.billCode"
    >
      {{ formData.billCode }}
    </ACopy>
  </AFormField>
</template>

<style lang="scss" scoped></style>
