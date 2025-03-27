<template>
  <ASelector
    :editor="UnitEditor"
    :entity="UnitEntity"
    :props="props"
    :service="UnitService"
    width="600px"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'
import { UnitEditor } from '.'

const props = defineProps(airPropsSelector<UnitEntity>())

</script>
<style lang="scss" scoped></style>
