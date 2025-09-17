import {BaseEntity} from '@/base/BaseEntity'
import {DateTimeFormatter, Field, Model, Table} from '@airpower/web'

@Model({
  label: '日志',
})
export class LogEntity extends BaseEntity {
  @Table()
  @Table({
    order: 66,
    force: true,
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
    order: 77,
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

  @Field({
    label: '发起时间',
  })
  @Table({
    hide: false,
    datetime: DateTimeFormatter.FULL_DATE_TIME,
    width: 150,
    order: 99,
    force: true,
  })
  declare createTime: number

  @Field({
    label: '响应时间',
  })
  @Table({
    hide: false,
    order: 88,
    width: 150,
    force: true,
  })
  declare updateTime: number

  @Table({
    width: 120,
    order: -1,
    align: 'right',
  })
  @Field({
    label: '总耗时',
  })
  pendingTime!: number
}
