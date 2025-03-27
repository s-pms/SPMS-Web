<template>
  <ASelector
    :entity="MenuEntity"
    :props="props"
    :service="MenuService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

const props = defineProps(airPropsSelector<MenuEntity>())

</script>
<style lang="scss" scoped></style>
