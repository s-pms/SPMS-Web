<script lang="ts" setup>
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { FileCategory } from '@/model/system/file/FileCategory'
import { FileEntity } from '@/model/system/file/FileEntity'
import { ContractParticipantEditor } from '@/view/console/asset/contract/component/index'
import { AButton, ADialog, AFormField, AGroup, ATab, ATable, ATabs } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new ContractEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, ContractService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    return submitData
  },
})

async function onAddParticipant() {
  const item: ParticipantEntity = await AirDialog.show(ContractParticipantEditor)
  formData.value.participantList.push(item)
}

async function onEdit(item: ParticipantEntity, index: number) {
  formData.value.participantList[index] = await AirDialog.show(ContractParticipantEditor, item)
}

async function onDelete(index: number) {
  await AirConfirm.warning('是否删除选中行的参与方？', '删除确认')
  formData.value.participantList.splice(index, 1)
}

async function onUpload() {
  const file: FileEntity = await AirDialog.showUpload({
    data: {
      category: FileCategory.CONTRACT_ATTACHMENT.key,
    },
    entity: FileEntity,
  })
  const document = new ContractDocumentEntity()
  document.name = file.name
  document.url = file.url
  document.size = file.size
  formData.value.documentList.push(document)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="70%"
    width="70%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <ATabs>
      <ATab label="合同基本信息">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
          @submit.prevent
        >
          <AGroup :column="2" title="基本信息">
            <AFormField field="code" />
            <AFormField field="name" />
            <AFormField field="type" />
            <AFormField field="isTemplate" />
          </AGroup>
          <AGroup :column="2" title="有效期">
            <AFormField field="startTime" />
            <AFormField field="endTime" />
          </AGroup>
          <AGroup title="合同内容">
            <AFormField field="content" />
          </AGroup>
        </el-form>
      </ATab>
      <ATab label="合同参与方">
        <ATable
          :ctrl-width="90"
          :data-list="formData.participantList"
          :entity="ParticipantEntity"
          hide-delete
          hide-edit
          hide-field-selector
        >
          <template #addButton>
            <AButton primary type="ADD" @click="onAddParticipant">
              添加参与方
            </AButton>
          </template>
          <template #customRow="row">
            <AButton link-button @click="onEdit(row.data, row.index)">
              编辑
            </AButton>
            <AButton danger link-button @click="onDelete(row.index)">
              编辑
            </AButton>
          </template>
        </ATable>
      </ATab>
      <ATab label="合同附件">
        <ATable
          :ctrl-width="90"
          :data-list="formData.documentList"
          :entity="ContractDocumentEntity"
          hide-delete
          hide-edit
          hide-field-selector
        >
          <template #addButton>
            <AButton primary type="ADD" @click="onUpload">
              上传附件
            </AButton>
          </template>
          <template #customRow="row">
            <AButton danger link-button @click="onDeleteDocument(row.index)">
              删除
            </AButton>
          </template>
        </ATable>
      </ATab>
    </ATabs>
  </ADialog>
</template>
