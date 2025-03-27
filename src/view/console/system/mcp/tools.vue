<template>
  <APanel>
    <template #footerLeft>
      <AButton
        link-button
        type="SETTING"
        @click="copy()"
      >
        MCP服务地址: {{ mcpServer }}
      </AButton>
    </template>
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :default-expand-all="false"
      :entity="McpToolModel"
      hide-delete
      hide-edit
    />
  </APanel>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { AButton, APanel, ATable } from '@airpower/component'
import { AirClipboard } from '@airpower/helper/AirClipboard'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { McpToolModel } from '@/model/system/mcp/McpToolModel'
import { McpToolService } from '@/model/system/mcp/McpToolService'

const isLoading = ref(false)
const list = ref([] as McpToolModel[])

async function getList() {
  list.value = await McpToolService.create(isLoading).getMcpTools()
}

const mcpServer = computed(() => `${window.location.origin}/api/mcp/sse?token=私人令牌`)

async function copy() {
  await AirClipboard.copy(mcpServer.value)
  AirNotification.success('已经成功复制到你的剪切板')
}

getList()
</script>
<style lang="scss" scoped></style>
