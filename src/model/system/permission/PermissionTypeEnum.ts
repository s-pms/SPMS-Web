import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

export class PermissionTypeEnum extends AirEnum {
  static API = new PermissionTypeEnum(0, 'API权限', AirColor.WARNING)

  static MCP = new PermissionTypeEnum(1, 'MCP权限', AirColor.SUCCESS)
}
