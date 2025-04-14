import { AirEnum } from '@airpower/base/AirEnum'

export class FileCategory extends AirEnum {
  static readonly TEMP = new FileCategory(0, '临时文件')
  static readonly NORMAL = new FileCategory(1, '普通文件')

  static readonly AVATAR = new FileCategory(1001, '头像')

  static readonly CONTRACT_ATTACHMENT = new FileCategory(2001, '合同附件')
}
