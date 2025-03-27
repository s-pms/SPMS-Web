<template>
  <ASelector
    :editor="RoleEditor"
    :entity="RoleEntity"
    :props="props"
    :service="RoleService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { RoleEditor } from '.'

const props = defineProps(airPropsSelector<RoleEntity>())

</script>
<style lang="scss" scoped></style>
