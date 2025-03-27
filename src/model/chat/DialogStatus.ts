import { AirEnum } from '@airpower/base/AirEnum'

export class DialogStatus extends AirEnum {
  static NONE = new DialogStatus(0, '无')

  static USER_CENTER = new DialogStatus(1, '用户中心')

  static EMOJI = new DialogStatus(2, '表情包')

  static ROOM_LIST = new DialogStatus(3, '房间列表')

  static ROOM_SETTING = new DialogStatus(4, '房间设置')

  static ONLINE = new DialogStatus(5, '在线列表')
}
