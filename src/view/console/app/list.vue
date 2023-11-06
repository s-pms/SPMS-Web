<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="AppEntity"
      :service="AppService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="AppEntity"
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
    >
      <template #customRow="{data}">
        <AButton
          icon-button
          type="SETTING"
          tooltip="重置秘钥"
          @click="onResetSecret(data)"
        />
        <AButton
          icon-button
          type="MONITOR"
          tooltip="测试OAuth2"
          @click="openOAuth2(data)"
        />
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

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { AppEntity } from '@/model/app/AppEntity'
import { AppService } from '@/model/app/AppService'
import { AppEditor } from './component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AirClipboard } from '@/airpower/helper/AirClipboard'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(AppEntity, AppService, {
  editView: AppEditor,
})

function openOAuth2(app: AppEntity) {
  // eslint-disable-next-line no-restricted-globals
  window.open(`${AirConfig.oauthUrl}?appKey=${app.appKey}&redirectUri=${encodeURIComponent(`${app.url}/callback`)}`)
}

async function onResetSecret(app: AppEntity) {
  await AirConfirm.warning('是否确认重置指定应用的秘钥?', '重置秘钥')
  const newSecret = await AppService.create(isLoading).resetSecret(app)
  await AirAlert.create().setConfirmText('复制秘钥').show(newSecret, '重置秘钥成功')
  await AirClipboard.copy(newSecret)
  AirNotification.success('复制秘钥成功')
}
</script>
<style scoped lang="scss"></style>
