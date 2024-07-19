<template>
  <ASelector
    :entity="UserEntity"
    :service="UserService"
    :props="props"
    :editor="UserEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { UserEditor } from '.'

const props = defineProps(airPropsSelector<UserEntity>())

</script>
<style scoped lang="scss"></style>
