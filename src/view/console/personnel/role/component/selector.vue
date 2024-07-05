<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    :title="title"
    is-selector
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      :loading="isLoading"
      :entity="RoleEntity"
      :service="RoleService"
      @on-search="onSearch"
      @on-add="onAdd"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="RoleEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template
        v-if="!mult"
        #customRow="{ data }"
      >
        <AButton
          type="SELECT"
          icon-button
          :disabled="data.isDisabled"
          tooltip="选择"
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, APage, ATable, AToolBar,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { RoleEditor } from '.'

const props = defineProps(airPropsSelector<RoleEntity>())

const {
  title, selectList, isLoading, response, disableConfirm,
  onSearch, onPageChanged, onSelected, onAdd,
} = useAirSelector(props, RoleEntity, RoleService, {
  editView: RoleEditor,
})
</script>
<style scoped lang="scss"></style>
