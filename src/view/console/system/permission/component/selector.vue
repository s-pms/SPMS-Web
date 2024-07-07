<template>
  <ASelector
    :entity="PermissionEntity"
    :service="PermissionService"
    :props="props"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

const props = defineProps(airPropsSelector<PermissionEntity>())

</script>
<style scoped lang="scss"></style>
