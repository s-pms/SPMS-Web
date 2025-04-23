<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'

import { ASelector } from '@airpower/web'
import { RoleEditor } from '.'

const props = defineProps(DialogProps.withSelector<RoleEntity>())
</script>

<template>
  <ASelector
    :editor="RoleEditor"
    :entity="RoleEntity"
    :props="props"
    :service="RoleService"
  />
</template>

<style lang="scss" scoped></style>
