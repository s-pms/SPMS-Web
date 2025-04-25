<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'

import { ContractStatusEnum } from '@/model/asset/contract/ContractStatusEnum'
import { AButton, APage, APanel, ATable, DialogUtil, FeedbackUtil } from '@airpower/web'
import { ContractDetail, ContractEditor } from './component'

const {
  isLoading,
  response,
  selectList,
  onSearch,
  onAdd,
  onDelete,
  onEdit,
  onPageChanged,
  onSortChanged,
  onSelected,
  onReloadData,
}
  = useMyTable(ContractService, {
  editView: ContractEditor,
})

async function onEnforce(contract: ContractEntity) {
  const roles: number[] = []
  contract.participantList.forEach((item) => {
    if (!roles.includes(item.role)) {
      roles.push(item.role)
    }
  })
  if (roles.length < 2) {
    FeedbackUtil.toastError('参与方至少有两方，请先确认')
    return
  }
  if (contract.documentList.length === 0) {
    await FeedbackUtil.confirmWarning('没有上传任何附件，是否继续生效合同？', '生效合同')
  } else {
    await FeedbackUtil.confirmWarning('是否确认生效这个合同？', '生效合同')
  }
  await ContractService.create(isLoading).enforce(contract)
  onReloadData()
}

async function onStop(contract: ContractEntity) {
  await FeedbackUtil.confirmWarning('是否确认终止这个合同？', '终止合同')
  await ContractService.create(isLoading).stop(contract)
  onReloadData()
}

async function onDetail(contract: ContractEntity) {
  DialogUtil.show(ContractDetail, contract)
}
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="row => !ContractStatusEnum.INVALID.equalsKey(row.status)"
      :disable-edit="row => !ContractStatusEnum.INVALID.equalsKey(row.status)"
      :entity="ContractEntity"
      :select-list="selectList"
      :service="ContractService"
      ctrl-width="200"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
      <template #customRow="row">
        <AButton
          :disabled="!ContractStatusEnum.INVALID.equalsKey(row.data.status)" link-button
          @click="onEnforce(row.data)"
        >
          生效
        </AButton>
        <AButton
          :disabled="!ContractStatusEnum.EFFECTIVE.equalsKey(row.data.status)" link-button
          @click="onStop(row.data)"
        >
          终止
        </AButton>
        <AButton
          link-button
          @click="onDetail(row.data)"
        >
          查看
        </AButton>
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
