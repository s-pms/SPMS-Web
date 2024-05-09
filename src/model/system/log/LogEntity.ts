import {
  Field, Model,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Table } from '@/airpower/decorator/TableField'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'

@Model('日志')
export class LogEntity extends BaseEntity {
  @Table()
  @Table({
    orderNumber: 66,
    forceShow: true,
  })
  @Field('动作') action!: string

  @Table({
    width: 100,
  })
  @Field('版本号') version!: number

  @Table()
  @Field('平台') platform!: string

  @Table({
    orderNumber: 77,
    width: 160,
  })
  @Field('IP') ip!: string

  @Field('请求体') request!: string

  @Field('响应数据') response!: string

  @Table({
    width: 60,
  })
  @Field('用户ID') userId!: number

  @Table({
    hide: false,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    label: '发起时间',
    width: 150,
    orderNumber: 99,
    forceShow: true,
  })
  declare createTime: number

  @Table({
    hide: false,
    label: '响应时间',
    orderNumber: 88,
    width: 150,
    forceShow: true,
  })
  declare updateTime: number

  @Table({
    width: 120,
    orderNumber: -1,
    align: 'right',
  })
  @Field('总耗时') penddingTime!: number
}
