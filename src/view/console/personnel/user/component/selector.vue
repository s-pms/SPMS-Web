<script lang="ts" setup>
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

import { ASelector } from '@airpower/web'
import { UserEditor } from '.'

const props = defineProps(DialogProps.withSelector<UserEntity>())
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
