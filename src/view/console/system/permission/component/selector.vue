<script lang="ts" setup>
import {ASelector, DialogProps} from '@airpower/web'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'

import { PermissionService } from '@/model/system/permission/PermissionService'

const props = defineProps(DialogProps.withSelector<PermissionEntity>())
</script>

<template>
  <ASelector
    :entity="PermissionEntity"
    :props="props"
    :service="PermissionService"
  />
</template>

<style lang="scss" scoped></style>
