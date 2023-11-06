import { AirAbstractService } from '@/airpower/base/AirAbstractService'
import { UserEntity } from '@/model/personnel/user/UserEntity'

export class MailService extends AirAbstractService {
  baseUrl = 'mail'

  /**
   * # 发送验证码
   * @param user 用户
   */
  async sendCode(user: UserEntity): Promise<void> {
    await this.api('send').setTimeout(10000).post(user)
  }
}
