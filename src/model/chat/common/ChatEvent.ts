import { AirModel } from '@/airpower/base/AirModel'

/**
 * # 聊天事件
 * @author Hamm.cn
 */
export class ChatEvent extends AirModel {
  id!: string

  type!: string

  time!: number
}
