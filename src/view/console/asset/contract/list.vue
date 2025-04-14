<script lang="ts" setup>
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractStatusEnum } from '@/model/asset/contract/ContractStatusEnum'
import { AButton, APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirAlert } from '@airpower/feedback/AirAlert'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirTable } from '@airpower/hook/useAirTable'
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
  = useAirTable(ContractService, {
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
    await AirAlert.error('参与方至少有两方，请先确认', '生效失败')
    return
  }
  if (contract.documentList.length === 0) {
    await AirConfirm.warning('没有上传任何附件，是否继续生效合同？', '生效合同')
  }
  else {
    await AirConfirm.warning('是否确认生效这个合同？', '生效合同')
  }
  await ContractService.create(isLoading).enforce(contract)
  onReloadData()
}

async function onStop(contract: ContractEntity) {
  await AirConfirm.warning('是否确认终止这个合同？', '终止合同')
  await ContractService.create(isLoading).stop(contract)
  onReloadData()
}

async function onDetail(contract: ContractEntity) {
  AirDialog.show(ContractDetail, contract)
}
</script>

<template>
  <APanel>
    <AToolBar
      :entity="ContractEntity"
      :loading="isLoading"
      :service="ContractService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="200"
      :data-list="response.list"
      :disable-delete="row => ContractStatusEnum.INVALID.notEqualsKey(row.status)"
      :disable-edit="row => ContractStatusEnum.INVALID.notEqualsKey(row.status)"
      :entity="ContractEntity"
      :select-list="selectList"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="row">
        <AButton
          :disabled="ContractStatusEnum.INVALID.notEqualsKey(row.data.status)" link-button
          @click="onEnforce(row.data)"
        >
          生效
        </AButton>
        <AButton
          :disabled="ContractStatusEnum.EFFECTIVE.notEqualsKey(row.data.status)" link-button
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
