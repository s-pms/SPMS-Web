<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { MaterialEditor } from './component'

const hook = useMyTable(MaterialService, {
  editView: MaterialEditor,
  beforeSearch: (requestData) => {
    if (requestData.filter.unitName) {
      const unit = new UnitEntity()
      unit.name = requestData.filter.unitName
      requestData.filter.unit = unit
      requestData.filter.unitName = undefined
    }
    return requestData
  },
})
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
