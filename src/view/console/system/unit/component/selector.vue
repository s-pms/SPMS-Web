<script lang="ts" setup>
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { UnitEditor } from '.'

const props = defineProps(airPropsSelector<UnitEntity>())
</script>

<template>
  <ASelector
    :editor="UnitEditor"
    :entity="UnitEntity"
    :props="props"
    :service="UnitService"
    width="600px"
  />
</template>

<style lang="scss" scoped></style>
