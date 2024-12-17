<script generic="D extends AbstractBaseBillDetailEntity,B extends AbstractBaseBillEntity<D>" lang="ts" setup>
import {
  inject, PropType, ref, Ref,
} from 'vue'
import { ACopy, AFormField } from '@/airpower/component'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'

const props = defineProps({

  /**
   * ### 手动绑定的表单对象
   */
  modelValue: {
    type: Object as PropType<B>,
    default: null,
  },

  /**
   * ### 是否禁用输入
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const injectFormData = inject('formData') as Ref<B> | undefined

// 手动绑定的 v-model 覆盖 自动注入的表单对象
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = ref(props.modelValue) as Ref<B>
if (injectFormData && injectFormData.value) {
  formData.value = injectFormData.value
}
if (!formData.value) {
  throw new Error('请手动为 formData 绑定v-model或使用useAirEditor创建表单对象(推荐)！！！')
}

</script>

<template>
  <AFormField
    field="billCode"
  >
    <ACopy
      v-if="formData.id"
      :content="formData.billCode"
    >
      {{ formData.billCode }}
    </ACopy>
  </AFormField>
</template>

<style lang="scss" scoped>

</style>
