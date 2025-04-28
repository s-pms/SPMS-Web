import type { Ref } from 'vue'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { ref } from 'vue'

/**
 * # 应用配置
 *
 * @author Hamm.cn
 */
export class AppConfig {
  /**
   * ## 当前登录的用户
   */
  static currentUser: Ref<UserEntity> = ref(new UserEntity())
}
