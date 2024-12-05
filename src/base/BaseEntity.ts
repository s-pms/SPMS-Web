import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { AirEntity } from '@/airpower/base/AirEntity'
import { Table } from '@/airpower/decorator/TableField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 数据库实体基类
 * @author Hamm
 */

@Model({
  addChildPermission: 'add',
})
export class BaseEntity extends AirEntity {
  @Field({
    label: '创建时间',
    type: Number,
  })
    createTime!: number

  @Table({
    width: 170,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    hide: true,
  })
  @Field({
    label: '更新时间',
    type: Number,
  })
    updateTime!: number
}
