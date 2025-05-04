<script lang="ts" setup>
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

import { ASelector, DialogProps } from '@airpower/web'

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
