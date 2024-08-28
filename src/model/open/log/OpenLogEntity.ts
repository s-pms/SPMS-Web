import { BaseEntity } from '@/base/BaseEntity'
import { OpenAppEntity } from '../app/OpenAppEntity'
import { Field, Type } from '@/airpower/decorator/Custom'
import { Table } from '@/airpower/decorator/TableField'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'

export class OpenLogEntity extends BaseEntity {
  @Type(OpenAppEntity) openApp!: OpenAppEntity

  @Table({
    width: 200,
  })
  @Field('来源IP') ip!: string

  @Table()
  @Field('请求地址') url!: string

  @Field('请求数据') request!: string

  @Field('响应数据') response!: string

  @Table({
    align: 'right',
    width: 200,
  })
  @Field('处理时间') mSecond!: string

  @Table({
    removed: false,
    hide: false,
  })
  @Field('请求时间')
  declare createTime: number

  @Table({
    orderNumber: -100,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    width: 180,
  })
  @Field('响应时间')
  declare updateTime: number
}
