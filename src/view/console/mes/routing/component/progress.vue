<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    confirm-text="保存"
    height="80%"
    title="工艺流程"
    width="75%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <div class="progress">
      <div class="top" />
      <div class="bottom">
        <div class="left">
          <div class="button">
            <AButton
              type="ADD"
              @click="onAddOperation"
            >
              添加工序
            </AButton>
          </div>
          <VueDraggable
            ref="el"
            v-model="list"
            :animation="150"
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
              <template
                v-if="list.length>0"
              >
                <div
                  v-for="(item) in list"
                  :key="item.id"
                  class="item"
                  @click="current=item"
                >
                  <div class="title">
                    <span>{{ item.operation.code }}</span> {{ item.operation.name }}
                  </div>
                  <div class="detail">
                    <el-tag v-if="item.bom">
                      物料清单
                    </el-tag>
                  </div>
                </div>
              </template>
              <AEmpty v-else>
                暂无工序
              </AEmpty>
            </TransitionGroup>
          </VueDraggable>
        </div>
        <div class="right">
          123
        </div>
      </div>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { nextTick, ref } from 'vue'
import { AButton, ADialog, AEmpty } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { RoutingOperationEntity } from '@/model/mes/routing/operation/RoutingOperationEntity'
import { RoutingOperationService } from '@/model/mes/routing/operation/RoutingOperationService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { OperationSelector } from '@/view/console/mes/operation/component'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new RoutingEntity()))
const drag = ref(false)
const {
  formRef,
  isLoading,
  formData,
} = useAirEditor(props, RoutingEntity, RoutingService)
const current = ref(new RoutingOperationEntity())
const list = ref<RoutingOperationEntity[]>([])

const request = ref(new AirRequest(RoutingOperationEntity))
request.value.filter.routingId = formData.value.id

async function getList() {
  list.value = await RoutingOperationService.create()
    .getList(request.value)
}

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
  await RoutingService.create()
    .update(formData.value)
  AirNotification.success('编辑工艺流程成功')
  props.onConfirm()
}

async function onAddOperation() {
  const operation = await AirDialog.select<OperationEntity>(OperationSelector)
  const item = new RoutingOperationEntity()
  item.operation = operation
  item.id = Math.random()
  list.value.push(item)
}

getList()
</script>

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

      .button {

      }

      .list {
        flex: 1;
        height: 0;
        position: relative;

        .item {
          cursor: grab;
          border-radius: 10px;
          border: 1px solid #f5f5f5;
          margin: 8px 0;
          background-color: #f5f5f5;
          font-size: 16px;
          padding: 10px 15px;
          user-select: none;
          transition: all .3s;
          min-height: 50px;

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

          * {
            user-select: none
          }
        }

        .end {
          height: auto !important;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .item:hover {
          background-color: #eee;
        }
      }
    }

    .right {
      flex: 1;
      width: 0;
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
