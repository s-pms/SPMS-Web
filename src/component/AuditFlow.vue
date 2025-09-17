<script lang="ts" setup>
import type { UserEntity } from '@/model/personnel/user/UserEntity'
import { DialogUtil, FeedbackUtil } from '@airpower/web'
import { ref } from 'vue'
import { UserSelector } from '@/view/console/personnel/user/component'

const props = defineProps({
  modelValue: {
    type: Array<UserEntity>,
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue'])

const auditUserList = ref<UserEntity[]>(props.modelValue)

function emitList() {
  emits('update:modelValue', auditUserList.value)
}

async function selectUser() {
  const user: UserEntity = await DialogUtil.select(UserSelector)
  const isExist = auditUserList.value.find(item => item.id === user.id)
  if (isExist) {
    FeedbackUtil.toastWarning(`${user.nickname} 已在当前审批流程中`)
    return
  }
  auditUserList.value.push(user)
  emitList()
}

function deleteAuditUser(index: number) {
  auditUserList.value.splice(index, 1)
  emitList()
}
</script>

<template>
  <div class="audit-list">
    <div
      v-for="(item, index) in auditUserList"
      :key="item.id"
      class="audit-item"
    >
      <el-tag
        closable
        effect="dark"
        type="warning"
        @close="deleteAuditUser(index) "
      >
        {{ item.nickname }}
      </el-tag>
    </div>
    <el-tag
      icon="add"
      style="cursor: pointer; margin-left: 10px"
      type="primary"
      @click="selectUser()"
    >
      添加审批人
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
.audit-list {
  .audit-item {
    display: inline-block;
    vertical-align: middle;
  }

  .audit-item:not(:first-child):before {
    content: '>';
    background: var(--el-color-primary-light-8);
    font-family: serif;
    color: #999;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    border-radius: 100%;
    margin: 0 5px;
    font-size: 14px;
    font-weight: bolder;
  }

  > * {
    margin-bottom: 10px;
  }
}
</style>
