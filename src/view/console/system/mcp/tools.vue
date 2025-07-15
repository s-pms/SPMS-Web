<script lang="ts" setup>
import { AButton, APanel, ATable, FeedbackUtil } from '@airpower/web'
import { computed, ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { McpToolModel } from '@/model/system/mcp/McpToolModel'
import { McpToolService } from '@/model/system/mcp/McpToolService'

const { toClipboard } = useClipboard()

const isLoading = ref(false)
const list = ref([] as McpToolModel[])

async function getList() {
  list.value = await McpToolService.create(isLoading).getMcpTools()
}

const mcpServer = computed(() => `${window.location.origin}/api/mcp/sse?token=私人令牌`)

async function copy() {
  await toClipboard(mcpServer.value)
  FeedbackUtil.toastSuccess('已经成功复制到你的剪切板')
}

getList()
</script>

<template>
  <APanel>
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :entity="McpToolModel"
      hide-add
      hide-column-selector
      hide-ctrl
    >
      <template #beforePage>
        <AButton
          link
          @click="copy()"
        >
          MCP服务地址: {{ mcpServer }}
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
