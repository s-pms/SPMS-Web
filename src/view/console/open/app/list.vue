<script lang="ts" setup>
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { AButton, APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirAlert } from '@airpower/feedback/AirAlert'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirClipboard } from '@airpower/helper/AirClipboard'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirTable } from '@airpower/hook/useAirTable'
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
} = useAirTable(OpenAppService, {
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
  AirNotification.success('复制AppSecret成功')
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
  AirNotification.success('复制RSA公钥成功')
  onReloadData()
}

async function onAdd() {
  const appSecret: string = await AirDialog.show(OpenAppEditor)
  onReloadData()
  await AirAlert.create()
    .setConfirmText('复制并关闭')
    .hideClose()
    .success('请注意，服务端将不再保存当前应用的 AppSecret/公钥，请务必保存到安全的地方。', '应用创建成功')
  await AirClipboard.copy(appSecret)
}

async function onTest() {
  AirDialog.show(OpenAppTest)
}

async function onAppLog(app: OpenAppEntity) {
  AirDialog.show(OpenAppLog, app)
}

function openOAuth2(app: OpenAppEntity) {
  window.open(app.url)
}
</script>

<template>
  <APanel>
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
      :ctrl-width="280"
      :data-list="response.list"
      :disable-edit="(row) => row.isDisabled"
      :entity="OpenAppEntity"
      hide-delete
      show-enable-and-disable
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
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
