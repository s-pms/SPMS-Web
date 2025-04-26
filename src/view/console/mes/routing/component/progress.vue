<script lang="ts" setup>
import type { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { RoutingOperationEntity } from '@/model/mes/routing/operation/RoutingOperationEntity'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { BomSelector } from '@/view/console/mes/bom/component'
import { OperationSelector } from '@/view/console/mes/operation/component'
import {
  AButton,
  ADialog,
  AEmpty,
  AGroup,
  ASelect,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  QueryRequest,
  useEditor,
} from '@airpower/web'
import { nextTick, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps(DialogProps.withParam(new RoutingEntity()))
const drag = ref(false)
const current = ref(-1)
const currentModel = ref(new RoutingOperationEntity())
const list = ref<RoutingOperationEntity[]>([])
const bomDetails = ref<BomDetailEntity[]>([])
const {
  formRef,
  isLoading,
  formData,
} = useEditor(props, RoutingService, {
  afterGetDetail(detailData) {
    list.value = detailData.details
    return detailData
  },
})

const request = ref(new QueryRequest(RoutingOperationEntity))
request.value.filter.routingId = formData.value.id

function onStart() {
  drag.value = true
}

function onEnd() {
  nextTick(() => {
    drag.value = false
  })
}

async function onSubmit() {
  formData.value.details = list.value
  formData.value.details.forEach((item, index) => {
    item.sortNo = index
  })
  await RoutingService.create().update(formData.value)
  FeedbackUtil.toastSuccess('编辑工艺流程成功')
  props.onConfirm()
}

async function getBomDetails(bomId: number) {
  const bom = await BomService.create(isLoading).getDetail(bomId)

  bomDetails.value = bom.details
}

function isAutoNextChanged() {
  if (formData.value.isPublished) {
    return
  }
  list.value[current.value].isAutoNext = !list.value[current.value].isAutoNext
}

function bomChanged() {
  list.value[current.value].bom = currentModel.value.bom
  getBomDetails(currentModel.value.bom.id)
}

async function currentChanged(index: number, item: RoutingOperationEntity) {
  current.value = index
  currentModel.value = item.copy()
  bomDetails.value = []
  if (item.bom) {
    getBomDetails(item.bom.id)
  }
}

async function onAddOperation() {
  const operation = await DialogUtil.select<OperationEntity>(OperationSelector)
  const item = new RoutingOperationEntity()
  item.operation = operation
  item.id = Math.random()
  list.value.push(item)
}

function onDeleteRoutingOperation(index: number) {
  current.value = -1
  list.value.splice(index, 1)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    confirm-text="保存"
    height="80%"
    hide-fullscreen
    title="工艺流程"
    width="75%"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <div class="progress">
      <div class="top" />
      <div class="bottom">
        <div class="left">
          <div class="button">
            <AButton
              v-if="!formData.isPublished"
              type="ADD"
              @click="onAddOperation"
            >
              添加工序
            </AButton>
          </div>

          <VueDraggable
            v-model="list"
            :animation="150"
            :disabled="formData.isPublished"
            class="list"
            target=".sort-target"
            @end="onEnd"
            @start="onStart"
          >
            <TransitionGroup
              :name="!drag ? 'fade' : undefined"
              class="sort-target"
              tag="div"
              type="transition"
            >
              <template v-if="list.length > 0">
                <div
                  v-for="(item, index) in list"
                  :key="item.id"
                  :class="current === index ? 'current' : ''"
                  class="item"
                  @click="currentChanged(index, item)"
                >
                  <div class="title">
                    <span>{{ item.operation.code }}</span> {{ item.operation.name }}
                  </div>
                  <div
                    v-if="!formData.isPublished"
                    class="delete"
                    @click.stop="onDeleteRoutingOperation(index)"
                  >
                    删除
                  </div>
                  <div class="status">
                    <span v-if="item.bom">物料清单</span>
                    <span v-if="item.isAutoNext">自动流转</span>
                  </div>
                </div>
              </template>
              <AEmpty v-else>
                暂无工序
              </AEmpty>
            </TransitionGroup>
          </VueDraggable>
        </div>
        <div
          v-if="current >= 0"
          class="right"
        >
          <AGroup title="工序配置">
            <el-form>
              <el-form-item label="自动工序流转">
                <el-switch
                  v-model="currentModel.isAutoNext"
                  :disabled="formData.isPublished"
                  @click="isAutoNextChanged"
                />
              </el-form-item>
              <el-form-item label="工序配方">
                <ASelect
                  v-model="currentModel.bom"
                  :disabled="formData.isPublished"
                  :selector="BomSelector"
                  @changed="bomChanged"
                />
              </el-form-item>
            </el-form>
          </AGroup>
          <AGroup
            v-if="currentModel.bom"
            :column="1"
            title="物料清单"
          >
            <ATable
              :data-list="bomDetails"
              :entity="BomDetailEntity"
              hide-delete
              hide-edit
            >
              <template #materialCode="{ data }">
                {{ data.material.code }}
              </template>
              <template #materialName="{ data }">
                {{ data.material.name }}
              </template>
            </ATable>
          </AGroup>
        </div>
      </div>
    </div>
  </ADialog>
</template>

<style lang="scss" scoped>
.progress {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;

  .bottom {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 0;
    border-top: 1px solid #f5f5f5;

    .left {
      width: 30%;
      position: relative;
      border-right: 1px solid #f5f5f5;
      padding: 10px;
      display: flex;
      flex-direction: column;

      .list {
        flex: 1;
        height: 0;
        position: relative;

        .item {
          cursor: grab;
          border-radius: 10px;
          border: 1px solid #f8f8f8;
          margin: 8px 0;
          background-color: #f8f8f8;
          font-size: 16px;
          padding: 10px 15px;
          user-select: none;
          transition: all 0.3s;
          min-height: 50px;
          position: relative;

          .title {
            display: flex;
            align-items: center;

            span {
              margin-right: 5px;
              background-color: #333;
              color: white;
              font-size: 12px;
              padding: 1px 3px;
              border-radius: 4px;
            }
          }

          .detail {
            position: relative;
          }

          .delete {
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 12px;
            color: var(--el-color-danger-light-3);
            display: none;
          }

          .status {
            position: absolute;
            right: 5px;
            bottom: 5px;
            font-size: 12px;
            color: var(--el-color-primary-light-3);

            span {
              margin-left: 5px;
            }
          }

          * {
            user-select: none;
          }
        }

        .item.current {
          border-color: var(--el-color-primary-light-7);
          background-color: var(--el-color-primary-light-8);

          .delete {
            display: inline-block;
            cursor: pointer;
          }
        }

        .item:hover {
          background-color: var(--el-color-primary-light-8);
        }
      }
    }

    .right {
      flex: 1;
      width: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;

      ::v-deep(.air-group) {
        height: auto !important;

        .group-body {
          height: 100%;
        }
      }
    }
  }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
