<script lang="ts" setup>
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'

import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { ADialog, AFormField, AGroup, ATab, ATable, ATabs, DialogProps, useDetail, WebFileUtil } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new ContractEntity()))

const {
  title,
  formData,
  isLoading,
} = useDetail(props, ContractService, {})
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="70%"
    width="70%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <ATabs>
      <ATab label="合同基本信息">
        <el-form
          label-width="120px"
          @submit.prevent
        >
          <AGroup
            :column="2"
            title="基本信息"
          >
            <AFormField
              disabled
              field="code"
            />
            <AFormField
              disabled
              field="name"
            />
            <AFormField
              disabled
              field="type"
            />
          </AGroup>
          <AGroup
            :column="2"
            title="有效期"
          >
            <AFormField
              disabled
              field="startTime"
            />
            <AFormField
              disabled
              field="endTime"
            />
          </AGroup>
          <AGroup title="合同内容">
            <AFormField
              disabled
              field="content"
            />
          </AGroup>
        </el-form>
      </ATab>
      <ATab label="合同参与方">
        <ATable
          :data-list="formData.participantList"
          :entity="ParticipantEntity"
          ctrl-width="40"
          hide-add
          hide-column-selector
          hide-delete
          hide-edit
        />
      </ATab>
      <ATab label="合同附件">
        <ATable
          :data-list="formData.documentList"
          :entity="ContractDocumentEntity"
          ctrl-width="40"
          hide-add
          hide-column-selector
          hide-ctrl
        >
          <template #url="row">
            <el-link
              :href="WebFileUtil.getStaticFileUrl(row.data.url)"
              target="_blank"
            >
              {{ row.data.url }}
            </el-link>
          </template>
        </ATable>
      </ATab>
    </ATabs>
  </ADialog>
</template>
