<template>
  <ASelector
    :entity="UnitEntity"
    :service="UnitService"
    :props="props"
    width="600px"
    :editor="UnitEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'
import { UnitEditor } from '.'

const props = defineProps(airPropsSelector<UnitEntity>())

</script>
<style scoped lang="scss"></style>
