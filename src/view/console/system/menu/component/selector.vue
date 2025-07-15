<script lang="ts" setup>
import {ASelector, DialogProps} from '@airpower/web'
import { MenuEntity } from '@/model/system/menu/MenuEntity'

import { MenuService } from '@/model/system/menu/MenuService'

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
