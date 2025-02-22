import { AirEnum } from '@/airpower/base/AirEnum'

export class MemberRole extends AirEnum {
  static readonly ADMIN = new MemberRole(1, '超管')

  static readonly OWNER = new MemberRole(2, '房主')

  static readonly ASSISTANT = new MemberRole(3, '副房主')

  static readonly MANAGER = new MemberRole(4, '管理员')

  static readonly MEMBER = new MemberRole(5, '成员')

  static readonly VISITOR = new MemberRole(6, '游客')
}
