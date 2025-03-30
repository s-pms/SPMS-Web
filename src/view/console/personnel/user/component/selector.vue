<script lang="ts" setup>
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { UserEditor } from '.'

const props = defineProps(airPropsSelector<UserEntity>())
</script>

<template>
  <ASelector
    :editor="UserEditor"
    :entity="UserEntity"
    :props="props"
    :service="UserService"
  />
</template>

<style lang="scss" scoped></style>
