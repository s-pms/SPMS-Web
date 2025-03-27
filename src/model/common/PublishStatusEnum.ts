import { AirColor } from '@airpower/enum/AirColor'
import { AirEnum } from '@airpower/base/AirEnum'

export class PublishStatusEnum extends AirEnum<boolean> {
  static readonly YES = new PublishStatusEnum(true, '已发布', AirColor.SUCCESS)

  static readonly NO = new PublishStatusEnum(false, '待发布', AirColor.NORMAL)
}
