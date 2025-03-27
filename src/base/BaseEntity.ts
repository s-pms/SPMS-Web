import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { AirEntity } from '@airpower/base/AirEntity'
import {
  Field, Model, Search, Table,
} from '@airpower/decorator'
import { PublishStatusEnum } from '@/model/common/PublishStatusEnum'

/**
 * # 数据库实体基类
 * @author Hamm.cn
 */

@Model({
  addChildPermission: 'add',
})
export class BaseEntity extends AirEntity {
  @Table({
    showColor: true,
    width: 80,
    orderNumber: -99,
    forceShow: true,
    removed: true,
  })
  @Field({
    label: '发布状态',
    type: Boolean,
    dictionary: PublishStatusEnum,
  })
  @Search({
    orderNumber: -1,
    hide: true,
  })
    isPublished!: boolean

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
