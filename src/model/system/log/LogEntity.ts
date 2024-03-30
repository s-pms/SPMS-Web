import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { TableField } from '@/airpower/decorator/TableField'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'

@ClassName('日志')
export class LogEntity extends BaseEntity {
  @TableField()
  @TableField({
    orderNumber: 66,
    forceShow: true,
  })
  @FieldName('动作') action!: string

  @TableField({
    width: 100,
  })
  @FieldName('版本号') version!: number

  @TableField()
  @FieldName('平台') platform!: string

  @TableField({
    orderNumber: 77,
    width: 160,
  })
  @FieldName('IP') ip!: string

  @FieldName('请求体') request!: string

  @FieldName('响应数据') response!: string

  @TableField({
    width: 60,
  })
  @FieldName('用户ID') userId!: number

  @TableField({
    hide: false,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    label: '发起时间',
    width: 150,
    orderNumber: 99,
    forceShow: true,
  })
  declare createTime: number

  @TableField({
    hide: false,
    label: '响应时间',
    orderNumber: 88,
    width: 150,
    forceShow: true,
  })
  declare updateTime: number

  @TableField({
    width: 120,
    orderNumber: -1,
    align: 'right',
  })
  @FieldName('总耗时') penddingTime!: number
}
