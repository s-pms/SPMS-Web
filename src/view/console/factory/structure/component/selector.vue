<script lang="ts" setup>
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'

const props = defineProps(airPropsSelector<StructureEntity>())
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
