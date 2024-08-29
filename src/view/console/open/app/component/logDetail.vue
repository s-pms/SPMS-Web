<template>
  <ADialog
    title="请求和响应数据"
    width="600px"
    height="70%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="请求">
        <el-tree
          :data="getTreeData(json)"
          :props="AirConfig.treeProps"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span class="key">{{ node.label }}</span>
              <span class="value">{{ data.value }}</span>
            </span>
          </template>
        </el-tree>
      </el-tab-pane>
      <el-tab-pane label="响应">
        <el-tree
          :data="getTreeData(JSON.parse(param.response))"
          :props="AirConfig.treeProps"
        >
          <template #default="{ node, data }">
            <ACopy :content="data.value">
              <span class="custom-tree-node">
                <span class="key">{{ node.label }}</span>
                <span class="value">
                  <span class="box">{{ data.value }}</span>
                </span>
              </span>
            </ACopy>
          </template>
        </el-tree>
      </el-tab-pane>
    </el-tabs>
  </ADialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ACopy, ADialog } from '@/airpower/component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { airPropsParam } from '@/airpower/config/AirProps'
import { IJson } from '@/airpower/interface/IJson'
import { OpenLogEntity } from '@/model/open/log/OpenLogEntity'

const props = defineProps(airPropsParam(new OpenLogEntity()))

function getTreeData(obj: IJson): IJson[] {
  const treeData = []
  const keys = Object.keys(obj || {})

  for (let i = 0; i < keys.length; i += 1) {
    if (typeof obj[keys[i]] === 'object') {
      treeData.push({
        key: i,
        name: keys[i],
        children: getTreeData(obj[keys[i]]),
        value: '',
      })
    } else {
      treeData.push({
        key: i,
        name: `${keys[i]}`,
        children: [],
        value: obj[keys[i]],
      })
    }
  }
  return treeData
}

const json = computed(() => {
  try {
    return JSON.parse(props.param.request)
  } catch (e) {
    return {}
  }
})
</script>
<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 0;
  flex: 1;

  .key {
    color: #999;
  }

  .value {
    color: var(--primary-color);
    flex: 1;
    display: flex;
    justify-content: flex-end;
    width: 0;
    margin-left: 20px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;

    .box {
      display: flex;
      text-align: left;
      max-width: 100%;
    }
  }
}
</style>
