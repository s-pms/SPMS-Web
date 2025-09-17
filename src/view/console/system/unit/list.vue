<script lang="ts" setup>
import {useMyTable} from '@/hook/useMyTable'
import {UnitService} from '@/model/system/unit/UnitService'
import {APanel, ATable} from '@airpower/web'
import {UnitEditor} from './component'

const hook = useMyTable(UnitService, {
  editView: UnitEditor,
})
</script>

<template>
  <APanel>
    <ATable :use-hook="hook" />
  </APanel>
</template>

<style lang="scss" scoped></style>
