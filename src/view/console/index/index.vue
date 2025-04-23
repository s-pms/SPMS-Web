<script lang="ts" setup>
import type { IJson } from '@airpower/web'
import { APanel } from '@airpower/web'
import { ref } from 'vue'

const modules = ref<IJson[]>([
  {
    title: 'ERP资产管理',
    actions: [
      {
        name: '人员和权限',
        desc: '统一管理人员、角色、权限等信息',
      },
      {
        name: '采购和销售渠道',
        desc: '通过供应商、客户、单价、单据了解企业采购和销售的支出和收入',
      },
      {
        name: '物料和设备',
        desc: '管理企业内部的物料、设备等资产',
      },
      {
        name: '企业和工厂模型',
        desc: '管理企业的组织架构、工厂的生产单元、仓库的存储结构',
      },
    ],
  },
  {
    title: 'WMS仓储管理',
    actions: [
      {
        name: '库存信息概览',
        desc: '实时查看仓库各个单位的存储情况',
      },
      {
        name: '多种入库方式',
        desc: '关联生产、采购以及其他方式的入库，来源一目了然',
      },
      {
        name: '库存盘点和移动',
        desc: '随时盘点库存、移动存储的物料',
      },
      {
        name: '多种出库方式',
        desc: '关联销售、生产领料等其他方式的出库',
      },
    ],
  },
  {
    title: 'MES生产管理',
    actions: [
      {
        name: '生产准备',
        desc: '管理工艺、工序、配料单等生产信息准备',
      },
      {
        name: '生产计划',
        desc: '可关联客户的销售单，提前指定生产计划',
      },
      {
        name: '生产订单',
        desc: '可关联生产计划，可直接下单生产',
      },
      {
        name: '生产管控',
        desc: '控制适当的领料、投料，规范生产过程',
      },
      {
        name: '生产过程',
        desc: '实时提交、采集生产过程中的关键数据以便质量控制和溯源',
      },
      {
        name: '生产监控',
        desc: '实时查看工厂生产状态、订单、工单执行状态',
      },
    ],
  },
  {
    title: 'QMS质量管控',
    actions: [
      {
        name: '质量标准',
        desc: '管理企业内部质量标准，可关联物料、设备等',
      },
      {
        name: '质量数据',
        desc: '实时采集生产过程、销售过程、生产过程等关键数据',
      },
      {
        name: '智能质检和判定',
        desc: '接入AI大模型，智能检验和判定生产数据是否正常',
      },
      {
        name: '质量追踪',
        desc: '监控生产过程中的异常信息，实时查看返工、返修、报废等状态',
      },
      {
        name: '质检大盘',
        desc: '通过监控大屏实时查看、分析异常生产',
      },
    ],
  },
])
</script>

<template>
  <APanel title="">
    <div class="index">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="module"
      >
        <div class="title">
          {{ module.title }}
        </div>
        <div class="actions">
          <div
            v-for="action in module.actions"
            :key="action"
            class="action"
          >
            <div class="name">
              {{ action.name }}
            </div>
            <div class="desc">
              {{ action.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </APanel>
</template>

<style lang="scss" scoped>
.index {
  position: absolute;
  inset: 10px;
  display: flex;
  flex-direction: column;

  .module {
    display: flex;
    flex-direction: column;
    margin: 5px;
    flex: 1;
    border-bottom: 3px solid var(--el-color-primary-light-9);
    padding: 10px 0;
    background: var(--el-color-primary-light-9);
    border-radius: 10px;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      padding: 10px 20px;
    }

    .actions {
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      flex: 1;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
      padding: 0 10px;

      .action {
        background: white;
        padding: 10px;
        margin: 0 5px;
        width: 25%;
        min-width: 300px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        flex-direction: column;

        .name {
          color: #333;
          margin-bottom: 5px;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.3s;
        }

        .desc {
          color: #aaa;
          font-size: 14px;
          height: 0;
          word-break: break-word;
          white-space: break-spaces;
          opacity: 0;
          transition: all 0.3s;
          padding: 0 20px;
        }
      }

      .action:hover {
        transform: scale(0.95);

        .name {
          margin-top: -40px;
          font-size: 14px;
        }

        .desc {
          display: block;
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }
}
</style>
