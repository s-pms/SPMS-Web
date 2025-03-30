<script lang="ts" setup>
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'

const props = defineProps(airPropsSelector<PermissionEntity>())
</script>

<template>
  <ASelector
    :entity="PermissionEntity"
    :props="props"
    :service="PermissionService"
  />
</template>

<style lang="scss" scoped></style>
