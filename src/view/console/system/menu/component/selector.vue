<script lang="ts" setup>
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'

const props = defineProps(airPropsSelector<MenuEntity>())
</script>

<template>
  <ASelector
    :entity="MenuEntity"
    :props="props"
    :service="MenuService"
  />
</template>

<style lang="scss" scoped></style>
