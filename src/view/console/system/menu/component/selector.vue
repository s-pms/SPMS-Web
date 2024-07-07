<template>
  <ASelector
    :entity="MenuEntity"
    :service="MenuService"
    :props="props"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

const props = defineProps(airPropsSelector<MenuEntity>())

</script>
<style scoped lang="scss"></style>
