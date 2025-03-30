import { BaseEntity } from '@/base/BaseEntity'
import { Field, Form, Model } from '@airpower/decorator'
import { RoomPrivate } from './RoomPrivate'

/**
 * # 房间实体
 * @author Hamm.cn
 */
@Model({
  label: '房间',
})
export class RoomEntity extends BaseEntity {
  @Field({
    label: '房间号',
  })
  code!: number

  @Field({
    label: '房间名称',
  })
  @Form({
    requiredString: true,
  })
  name!: string

  @Field({
    label: '房间密码',
  })
  @Form({
    requiredString: true,
    password: true,
  })
  password!: string

  @Field({
    label: '房间介绍',
  })
  description!: string

  @Field({
    label: '是否官方房间',
  })
  isOfficial!: boolean

  @Field({
    label: '房间权限',
  })
  @Form({
    dictionary: RoomPrivate,
    radio: true,
    defaultValue: RoomPrivate.NO.key,
  })
  isPrivate!: boolean

  @Field({
    label: '房间大小',
  })
  size!: number
}
