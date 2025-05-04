import { WebColor, WebEnum } from '@airpower/web'

export class PermissionSystemEnum extends WebEnum<boolean> {
  static NORMAL = new PermissionSystemEnum(false, '普通权限')
    .setColor(WebColor.NORMAL)

  static SYSTEM = new PermissionSystemEnum(true, '系统权限')
    .setColor(WebColor.DANGER)
}
