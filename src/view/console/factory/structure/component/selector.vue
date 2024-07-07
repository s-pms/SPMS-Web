<template>
  <ASelector
    :entity="StructureEntity"
    :service="StructureService"
    :props="props"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'

const props = defineProps(airPropsSelector<StructureEntity>())

</script>
<style scoped lang="scss"></style>
