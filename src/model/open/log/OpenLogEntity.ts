import { DateTimeFormatter, Field, Table, Type } from '@airpower/web'
import {BaseEntity} from '@/base/BaseEntity'
import { OpenAppEntity } from '../app/OpenAppEntity'

export class OpenLogEntity extends BaseEntity {
  @Type(OpenAppEntity)
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
    order: -100,
    datetime: DateTimeFormatter.FULL_DATE_TIME,
    width: 180,
  })
  @Field({
    label: '响应时间',
  })
  declare updateTime!: number
}
