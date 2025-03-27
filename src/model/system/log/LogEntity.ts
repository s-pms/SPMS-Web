import { Field, Model, Table } from '@airpower/decorator'
import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { BaseEntity } from '@/base/BaseEntity'

@Model({
  label: '日志',
})
export class LogEntity extends BaseEntity {
  @Table()
  @Table({
    orderNumber: 66,
    forceShow: true,
  })
  @Field({
    label: '动作',
  })
    action!: string

  @Table({
    width: 100,
  })
  @Field({
    label: '版本号',
  })
    version!: number

  @Table()
  @Field({
    label: '平台',
  })
    platform!: string

  @Table({
    orderNumber: 77,
    width: 160,
  })
  @Field({
    label: 'IP',
  })
    ip!: string

  @Field({
    label: '请求体',
  })
    request!: string

  @Field({
    label: '响应数据',
  })
    response!: string

  @Table({
    width: 60,
  })
  @Field({
    label: '用户ID',
  })
    userId!: number

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
  @Field({
    label: '总耗时',
  })
    pendingTime!: number
}
