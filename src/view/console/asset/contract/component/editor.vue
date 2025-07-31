<script lang="ts" setup>
import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ATab,
  ATable,
  ATabs,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  useEditor,
  WebFileUtil,
} from '@airpower/web'
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { FileCategory } from '@/model/system/file/FileCategory'

import { FileEntity } from '@/model/system/file/FileEntity'
import { ContractParticipantEditor } from '@/view/console/asset/contract/component/index'

const props = defineProps(DialogProps.withParam(new ContractEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, ContractService)

async function onAddParticipant() {
  const item: ParticipantEntity = await DialogUtil.show(ContractParticipantEditor)
  formData.value.participantList.push(item)
}

async function onEdit(item: ParticipantEntity, index: number) {
  formData.value.participantList[index] = await DialogUtil.show(ContractParticipantEditor, item)
}

async function onDelete(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的参与方？', '删除确认')
  formData.value.participantList.splice(index, 1)
}

async function onDeleteDocument(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的合同附件？', '删除确认')
  formData.value.documentList.splice(index, 1)
}

async function onUpload() {
  const file: FileEntity = await DialogUtil.showUpload({
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
    @cancel="onCancel"
    @confirm="onSubmit"
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
          <AGroup
            :column="2"
            title="基本信息"
          >
            <AFormField field="code" />
            <AFormField field="name" />
            <AFormField field="type" />
          </AGroup>
          <AGroup
            :column="2"
            title="有效期"
          >
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
          :data-list="formData.participantList"
          :entity="ParticipantEntity"
          ctrl-width="90"
          hide-add
          hide-column-selector
          hide-delete
          hide-edit
        >
          <template #addButton>
            <AButton
              icon="ADD"
              primary
              @click="onAddParticipant"
            >
              添加参与方
            </AButton>
          </template>
          <template #customRow="row">
            <AButton
              link
              @click="onEdit(row.data, row.index)"
            >
              编辑
            </AButton>
            <AButton
              danger
              link
              @click="onDelete(row.index)"
            >
              编辑
            </AButton>
          </template>
        </ATable>
      </ATab>
      <ATab label="合同附件">
        <ATable
          :data-list="formData.documentList"
          :entity="ContractDocumentEntity"
          ctrl-width="90"
          hide-column-selector
          hide-delete
          hide-edit
        >
          <template #url="row">
            <el-link
              :href="WebFileUtil.getStaticFileUrl(row.data.url)"
              target="_blank"
            >
              {{ row.data.url }}
            </el-link>
          </template>
          <template #addButton>
            <AButton
              icon="UPLOAD"
              primary
              @click="onUpload"
            >
              上传附件
            </AButton>
          </template>
          <template #customRow="row">
            <AButton
              danger
              link
              @click="onDeleteDocument(row.index)"
            >
              删除
            </AButton>
          </template>
        </ATable>
      </ATab>
    </ATabs>
  </ADialog>
</template>
