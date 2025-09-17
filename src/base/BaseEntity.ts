import { PublishStatusEnum } from '@/model/common/PublishStatusEnum'
import { Field, Model, RootEntity, Search, Table } from '@airpower/web'

/**
 * # 数据库实体基类
 * @author Hamm.cn
 */

@Model({
  addChildPermission: 'add',
})
export class BaseEntity extends RootEntity {
  @Table({
    color: true,
    width: 80,
    order: -99,
    force: true,
    removed: true,
  })
  @Field({
    label: '发布状态',
    dictionary: PublishStatusEnum,
  })
  @Search({
    order: -1,
    hide: true,
    width: 120,
  })
  isPublished!: boolean

  @Field({
    label: '创建时间',
  })
  createTime!: number

  @Table({
    width: 170,
    order: -99,
    datetime: true,
    hide: true,
  })
  @Field({
    label: '更新时间',
  })
  updateTime!: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
