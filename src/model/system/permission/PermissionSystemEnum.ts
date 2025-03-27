import { AirColor } from '@airpower/enum/AirColor'
import { AirEnum } from '@airpower/base/AirEnum'

export class PermissionSystemEnum extends AirEnum<boolean> {
  static NORMAL = new PermissionSystemEnum(false, '普通权限', AirColor.NORMAL)

  static SYSTEM = new PermissionSystemEnum(true, '系统权限', AirColor.DANGER)
}
