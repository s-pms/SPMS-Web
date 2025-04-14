<script lang="ts" setup>
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { ADialog, AFormField, AGroup, ATab, ATable, ATabs } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirFile } from '@airpower/helper/AirFile'
import { useAirDetail } from '@airpower/hook/useAirDetail'

const props = defineProps(airPropsParam(new ContractEntity()))

const {
  title,
  formData,
  isLoading,
} = useAirDetail(props, ContractService, {})
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="70%"
    width="70%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <ATabs>
      <ATab label="合同基本信息">
        <el-form
          label-width="120px"
          @submit.prevent
        >
          <AGroup :column="2" title="基本信息">
            <AFormField disabled field="code" />
            <AFormField disabled field="name" />
            <AFormField disabled field="type" />
          </AGroup>
          <AGroup :column="2" title="有效期">
            <AFormField disabled field="startTime" />
            <AFormField disabled field="endTime" />
          </AGroup>
          <AGroup title="合同内容">
            <AFormField disabled field="content" />
          </AGroup>
        </el-form>
      </ATab>
      <ATab label="合同参与方">
        <ATable
          :ctrl-width="40"
          :data-list="formData.participantList"
          :entity="ParticipantEntity"
          hide-delete
          hide-edit
          hide-field-selector
        />
      </ATab>
      <ATab label="合同附件">
        <ATable
          :ctrl-width="40"
          :data-list="formData.documentList"
          :entity="ContractDocumentEntity"
          hide-ctrl
          hide-field-selector
        >
          <template #url="row">
            <el-link :href="AirFile.getStaticFileUrl(row.data.url)" target="_blank">
              {{ row.data.url }}
            </el-link>
          </template>
        </ATable>
      </ATab>
    </ATabs>
  </ADialog>
</template>
