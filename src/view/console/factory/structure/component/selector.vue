<script lang="ts" setup>
import {StructureEntity} from '@/model/factory/structure/StructureEntity'
import {StructureService} from '@/model/factory/structure/StructureService'
import {ASelector, DialogProps} from '@airpower/web'

const props = defineProps(DialogProps.withSelector<StructureEntity>())
</script>

<template>
  <ASelector
    :entity="StructureEntity"
    :props="props"
    :service="StructureService"
    :un-paginate="true"
  />
</template>

<style lang="scss" scoped></style>
