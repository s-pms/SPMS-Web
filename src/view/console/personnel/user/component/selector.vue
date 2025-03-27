<template>
  <ASelector
    :editor="UserEditor"
    :entity="UserEntity"
    :props="props"
    :service="UserService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { UserEditor } from '.'

const props = defineProps(airPropsSelector<UserEntity>())

</script>
<style lang="scss" scoped></style>
