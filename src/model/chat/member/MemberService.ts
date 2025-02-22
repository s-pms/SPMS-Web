import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MemberEntity } from '@/model/chat/member/MemberEntity'

export class MemberService extends AbstractBaseService<MemberEntity> {
  private static DEFAULT_ROOM = 666

  entityClass = MemberEntity

  baseUrl = 'member'
}
