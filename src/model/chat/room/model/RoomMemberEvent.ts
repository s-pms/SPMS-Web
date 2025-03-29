import { ChatEvent } from '@/model/chat/common/ChatEvent'
import { MemberEntity } from '@/model/chat/member/MemberEntity'
import { Field } from '@airpower/decorator'

/**
 * # 房间成员事件
 * @author Hamm.cn
 */
export class RoomMemberEvent extends ChatEvent {
  @Field({
    type: MemberEntity,
  })
  member!: MemberEntity
}
