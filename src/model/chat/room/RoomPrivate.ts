import { AirEnum } from '@airpower/base/AirEnum'

/**
 * # 房间是否私有
 * @author Hamm.cn
 */
export class RoomPrivate extends AirEnum<boolean> {
  static readonly YES = new RoomPrivate(true, '私有房间')

  static readonly NO = new RoomPrivate(false, '公开房间')
}
