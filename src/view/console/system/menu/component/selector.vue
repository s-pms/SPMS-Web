<script lang="ts" setup>
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

import { ASelector } from '@airpower/web'

const props = defineProps(DialogProps.withSelector<MenuEntity>())
</script>

<template>
  <ASelector
    :entity="MenuEntity"
    :props="props"
    :service="MenuService"
  />
</template>

<style lang="scss" scoped></style>
