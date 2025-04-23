<script lang="ts" setup>
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'

import { AirClipboard } from '@airpower/helper/AirClipboard'

import { AButton, APage, APanel, ATable, DialogUtil } from '@airpower/web'
import { OpenAppEditor, OpenAppLog, OpenAppTest } from './component'

const {
  isLoading,
  response,
  onSearch,
  onDelete,
  onEdit,
  onPageChanged,
  onSortChanged,
  onDisable,
  onEnable,
  onReloadData,
} = useTable(OpenAppService, {
  editView: OpenAppEditor,
})

async function onResetSecret(app: OpenAppEntity) {
  await AirConfirm.create()
    .dangerButton()
    .setConfirmText('重置AppSecret')
    .setCancelText('关闭')
    .show('重置密钥后，使用原密钥的应用将无法访问API服务，是否确认重置?', '确认重置AppSecret')
  const newSecret = await OpenAppService.create(isLoading).resetSecret(app)
  await AirAlert.create()
    .setConfirmText('复制并关闭')
    .hideClose()
    .success('请注意，服务端将不再保存当前应用的 AppSecret，请务必将此密钥保存到安全的地方。', '重置AppSecret成功')
  await AirClipboard.copy(newSecret)
  FeedbackUtil.toastSuccess('复制AppSecret成功')
  onReloadData()
}

async function onResetKeyPair(app: OpenAppEntity) {
  await AirConfirm.create()
    .dangerButton()
    .setConfirmText('重置RSA密钥对')
    .setCancelText('关闭')
    .show('重置密钥后，使用原密钥的应用将无法访问API服务，是否确认重置?', '确认重置RSA密钥对')
  const newSecret = await OpenAppService.create(isLoading).resetKeyPair(app)
  await AirAlert.create()
    .setConfirmText('复制并关闭')
    .hideClose()
    .success('请注意，服务端将不再保存当前应用的 公钥，请务必将此密钥保存到安全的地方。', '重置RSA密钥对成功')
  await AirClipboard.copy(newSecret)
  FeedbackUtil.toastSuccess('复制RSA公钥成功')
  onReloadData()
}

async function onAdd() {
  const appSecret: string = await DialogUtil.show(OpenAppEditor)
  onReloadData()
  await AirAlert.create()
    .setConfirmText('复制并关闭')
    .hideClose()
    .success('请注意，服务端将不再保存当前应用的 AppSecret/公钥，请务必保存到安全的地方。', '应用创建成功')
  await AirClipboard.copy(appSecret)
}

async function onTest() {
  DialogUtil.show(OpenAppTest)
}

async function onAppLog(app: OpenAppEntity) {
  DialogUtil.show(OpenAppLog, app)
}

function openOAuth2(app: OpenAppEntity) {
  window.open(app.url)
}
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="OpenAppEntity"
      :loading="isLoading"
      :service="OpenAppService"
      @on-add="onAdd"
      @on-search="onSearch"
    >
      <template #afterButton>
        <AButton
          tooltip="测试API"
          type="CHECKIN"
          @click="onTest()"
        >
          测试API
        </AButton>
      </template>
    </AToolBar>
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => row.isDisabled"
      :entity="OpenAppEntity"
      ctrl-width="280"
      hide-delete
      show-enable-and-disable
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @on-disable="onDisable"
      @on-enable="onEnable"
    >
      <template #url="{ data }">
        <el-link @click="openOAuth2(data)">
          {{ data.url }}
        </el-link>
      </template>
      <template #customRow="{ data }">
        <AButton
          :disabled="data.isDisabled"
          link-button
          tooltip="重置AppSecret"
          @click="onResetSecret(data)"
        >
          重置Secret
        </AButton>
        <AButton
          :disabled="data.isDisabled"
          link-button
          tooltip="重置RSA密钥对"
          @click="onResetKeyPair(data)"
        >
          重置密钥对
        </AButton>
        <AButton
          link-button
          tooltip="请求日志"
          @click="onAppLog(data)"
        >
          日志
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
