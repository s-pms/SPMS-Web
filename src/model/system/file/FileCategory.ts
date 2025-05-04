import { WebEnum } from '@airpower/web'

export class FileCategory extends WebEnum {
  static readonly TEMP = new FileCategory(0, '临时文件')
  static readonly NORMAL = new FileCategory(1, '普通文件')

  static readonly AVATAR = new FileCategory(1001, '头像')

  static readonly CONTRACT_ATTACHMENT = new FileCategory(2001, '合同附件')
}
