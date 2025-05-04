<script lang="ts" setup>
import type { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { useMyTable } from '@/hook/useMyTable'
import { OpenAppService } from '@/model/open/app/OpenAppService'

import { AButton, APanel, ATable, DialogUtil, FeedbackUtil } from '@airpower/web'
import { ElMessageBox } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { OpenAppEditor, OpenAppLog, OpenAppTest } from './component'

const hook = useMyTable(OpenAppService, {
  editView: OpenAppEditor,
})
const { toClipboard } = useClipboard()

async function onResetSecret(app: OpenAppEntity) {
  await ElMessageBox.confirm('重置密钥后，使用原密钥的应用将无法访问API服务，是否确认重置?', '确认重置AppSecret', {
    confirmButtonClass: 'danger',
    confirmButtonText: '重置',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const newSecret = await OpenAppService.create(hook.isLoading).resetSecret(app)
  await ElMessageBox.alert('请注意，服务端将不再保存当前应用的 AppSecret，请务必将此密钥保存到安全的地方。', '重置AppSecret成功', {
    showClose: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    confirmButtonText: '复制并关闭',
    type: 'success',
  })
  await toClipboard(newSecret)
  FeedbackUtil.toastSuccess('复制AppSecret成功')
  hook.onReloadData()
}

async function onResetKeyPair(app: OpenAppEntity) {
  await ElMessageBox.confirm('重置密钥后，使用原密钥的应用将无法访问API服务，是否确认重置?', '确认重置RSA密钥对', {
    confirmButtonClass: 'danger',
    confirmButtonText: '重置',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const newSecret = await OpenAppService.create(hook.isLoading).resetKeyPair(app)
  await ElMessageBox.alert('请注意，服务端将不再保存当前应用的 公钥，请务必将此密钥保存到安全的地方。', '重置RSA密钥对成功', {
    showClose: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    confirmButtonText: '复制并关闭',
    type: 'success',
  })
  await toClipboard(newSecret)
  FeedbackUtil.toastSuccess('复制RSA公钥成功')
  hook.onReloadData()
}

async function onAdd() {
  const appSecret: string = await DialogUtil.show(OpenAppEditor)
  hook.onReloadData()
  await ElMessageBox.alert('请注意，服务端将不再保存当前应用的 AppSecret/公钥，请务必保存到安全的地方。', '应用创建成功', {
    showClose: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    confirmButtonText: '复制并关闭',
    type: 'success',
  })
  await toClipboard(appSecret)
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
  <APanel>
    <ATable
      :disable-edit="(row) => row.isDisabled"
      :on-add="onAdd"
      :use-hook="hook"
      ctrl-width="280"
      hide-delete
      show-enable-and-disable
    >
      <template #afterButton>
        <AButton
          icon="CHECK"
          @click="onTest()"
        >
          测试API
        </AButton>
      </template>
      <template #url="{ data }">
        <el-link @click="openOAuth2(data)">
          {{ data.url }}
        </el-link>
      </template>
      <template #customRow="{ data }">
        <AButton
          :disabled="data.isDisabled"
          link
          @click="onResetSecret(data)"
        >
          重置Secret
        </AButton>
        <AButton
          :disabled="data.isDisabled"
          link
          @click="onResetKeyPair(data)"
        >
          重置密钥对
        </AButton>
        <AButton
          link
          @click="onAppLog(data)"
        >
          日志
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
