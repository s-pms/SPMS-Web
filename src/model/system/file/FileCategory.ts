import { AirEnum } from '@airpower/base/AirEnum'

export class FileCategory extends AirEnum {
  static readonly NORMAL = new FileCategory(1, '普通文件')

  static readonly TEMP = new FileCategory(2, '临时文件')

  static readonly IMAGE = new FileCategory(3, '图片')

  static readonly VIDEO = new FileCategory(4, '视频')

  static readonly AUDIO = new FileCategory(5, '音频')

  static readonly AVATAR = new FileCategory(6, '头像')
}
