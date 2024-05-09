import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import {
  Field,
  Model,
  Type,
} from '@/airpower/decorator/Custom'
import { AirEntity } from '@/airpower/base/AirEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'

/**
 * # 数据库实体基类
 * @author Hamm
 */

@EntityConfig({
  addChildPermission: 'add',
})
@Model('记录')
export class BaseEntity extends AirEntity {
  @Field('创建时间')
  @Type(Number) createTime!: number

  @Field('更新时间')
  @Table({
    width: 170,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
    hide: true,
  })
  @Type(Number) updateTime!: number

  @Field('备注')
  @Form({
    textarea: true,
    orderNumber: -100,
    hide: true,
  })
  @Type(String) remark!: string
}
