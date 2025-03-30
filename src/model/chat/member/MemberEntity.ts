import { BaseEntity } from '@/base/BaseEntity'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { Field } from '@airpower/decorator'
import { RoomEntity } from '../room/RoomEntity'
import { MemberRole } from './MemberRole'

export class MemberEntity extends BaseEntity {
  @Field({
    type: UserEntity,
  })
  user!: UserEntity

  @Field({
    type: RoomEntity,
  })
  room!: RoomEntity

  @Field({
    dictionary: MemberRole,
  })
  role!: number
}
