<template>
  <ASelector
    :entity="MaterialEntity"
    :service="MaterialService"
    :props="props"
    :editor="MaterialEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { MaterialEditor } from '.'

const props = defineProps(airPropsSelector<MaterialEntity>())

</script>
<style scoped lang="scss"></style>
