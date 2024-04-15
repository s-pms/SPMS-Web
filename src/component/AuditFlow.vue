<template>
  <div class="audit-list">
    <div
      v-for="(item, index) in auditUserList"
      :key="item.id"
      class="audit-item"
    >
      <el-tag
        effect="dark"
        closable
        type="warning"
        @close="auditUserList.splice(index, 1); emitList()"
      >
        {{ item.nickname }}
      </el-tag>
    </div>
    <el-tag
      style="cursor:pointer;margin-left: 10px;"
      icon="add"
      type="primary"
      @click="selectUser()"
    >
      添加审批人
    </el-tag>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserSelector } from '@/view/console/personnel/user/component'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps({
  modelValue: {
    type: Array as PropType<UserEntity[]>,
    default: () => [],
  },
})

const auditUserList = ref<UserEntity[]>(props.modelValue)

const emits = defineEmits(['update:modelValue'])

function emitList() {
  emits('update:modelValue', auditUserList.value)
}

async function selectUser() {
  const user: UserEntity = await AirDialog.select(UserSelector)
  const isExist = auditUserList.value.find((item) => item.id === user.id)
  if (isExist) {
    AirNotification.warning(`${user.nickname} 已在当前审批流程中`)
    return
  }
  auditUserList.value.push(user)
  emitList()
}
</script>
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
