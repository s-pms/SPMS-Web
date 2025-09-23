<script lang="ts" setup>
import type { WebValidateRule } from '@airpower/web'
import type { FormInstance } from 'element-plus'
import { ADialog, AFormField, AInput, DialogProps, WebValidator } from '@airpower/web'
import { computed, ref } from 'vue'
import { CertificateTypeEnum } from '@/model/asset/contract/participant/CertificateTypeEnum'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { ParticipantTypeEnum } from '@/model/asset/contract/participant/ParticipantTypeEnum'

const props = defineProps(DialogProps.withParam(new ParticipantEntity()))

const formRef = ref<FormInstance>()

const formData = ref(props.param.copy())
formData.value.name = '凌小云'
formData.value.type = ParticipantTypeEnum.PERSONAL.key
formData.value.identification = '500000000000000'
formData.value.phone = '17666666666'

async function onSubmit() {
  formData.value.isPublished = true
  props.onConfirm(formData.value.copy())
}

const rules = WebValidator.create({
  name: [
    WebValidator.show('').ifEmpty(),
  ],
  phone: [
    WebValidator.show('').ifEmpty(),
    WebValidator.show().ifNotPhone(),
  ],
  email: [
    WebValidator.show().ifNotEmail(),
  ],
} as WebValidateRule<ParticipantEntity>)

const certificateTypeList = computed(() => {
  const list = CertificateTypeEnum.toArray()
  if (ParticipantTypeEnum.PERSONAL.equalsKey(formData.value.type)) {
    return list.filter(item => ![CertificateTypeEnum.UNIFIED_CREDIT_CODE.key, CertificateTypeEnum.OTHER.key].includes(item.key))
  }
  if (ParticipantTypeEnum.COMPANY.equalsKey(formData.value.type)) {
    return list.filter(item => [CertificateTypeEnum.UNIFIED_CREDIT_CODE.key].includes(item.key))
  }
  return list.filter(item => [CertificateTypeEnum.OTHER.key].includes(item.key))
})

const placeholder = ref('')
function onTypeChanged() {
  switch (formData.value.type) {
    case ParticipantTypeEnum.PERSONAL.key:
      formData.value.certificateType = CertificateTypeEnum.CHINESE_ID_CARD.key
      break
    case ParticipantTypeEnum.COMPANY.key:
      formData.value.certificateType = CertificateTypeEnum.UNIFIED_CREDIT_CODE.key
      break
    case ParticipantTypeEnum.OTHER.key:
      formData.value.certificateType = CertificateTypeEnum.OTHER.key
      break
  }
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :title="`${formData.isPublished ? '修改' : '添加'}参与方`"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="role"
      />
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="name"
      />
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="type"
        @change="onTypeChanged"
      >
      </AFormField>
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        :list="certificateTypeList"
        field="certificateType"
      />
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="identification"
        :placeholder="placeholder"
      />
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="phone"
      />
      <AFormField
        v-model="formData"
        :entity="ParticipantEntity"
        field="email"
      />
    </el-form>
  </ADialog>
</template>
