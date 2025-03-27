import { AirModel } from '@airpower/base/AirModel'

/**
 * # 进房申请
 * @author Hamm.cn
 */
export class RoomJoinRequest extends AirModel {
  roomCode!: number

  password!: string
}
