<template>
  <ASelector
    :entity="RoleEntity"
    :service="RoleService"
    :props="props"
    :editor="RoleEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { RoleEditor } from '.'

const props = defineProps(airPropsSelector<RoleEntity>())

</script>
<style scoped lang="scss"></style>
