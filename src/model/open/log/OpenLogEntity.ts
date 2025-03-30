import { BaseEntity } from '@/base/BaseEntity'
import { Field, Table } from '@airpower/decorator'
import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { OpenAppEntity } from '../app/OpenAppEntity'

export class OpenLogEntity extends BaseEntity {
  @Field({
    type: OpenAppEntity,
  })
  openApp!: OpenAppEntity

  @Table({
    width: 200,
  })
  @Field({
    label: '来源IP',
  })
  ip!: string

  @Table()
  @Field({
    label: '请求地址',
  })
  url!: string

  @Field({
    label: '请求数据',
  })
  request!: string

  @Field({
    label: '响应数据',
  })
  response!: string

  @Table({
    align: 'right',
    width: 200,
  })
  @Field({
    label: '处理时间',
  })
  mSecond!: string

  @Table({
    removed: false,
    hide: false,
  })
  @Field({
    label: '请求时间',
  })
  declare createTime: number

  @Table({
    orderNumber: -100,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    width: 180,
  })
  @Field({
    label: '响应时间',
  })
  updateTime!: number
}
