import {
  Field, Form, Model, Search, Table,
} from '@airpower/decorator'
import { AirSearchDataType } from '@airpower/enum/AirSearchDataType'
import { BaseEntity } from '@/base/BaseEntity'
import { NotifyChannelEnum } from '@/model/open/notify/NotifyChannelEnum'

@Model({
  label: '通知',
})
export class NotifyEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    orderNumber: 99,
    forceShow: true,
  })
  @Field({
    label: '通知场景',
  })
    scene !: number

  @Search({
    orderNumber: -1,
  })
  @Form({
    requiredNumber: true,
    showColor: true,
  })
  @Table({
    forceShow: true,
    width: 100,
    showColor: true,
  })
  @Field({
    label: '通知渠道',
    dictionary: NotifyChannelEnum,
  })
    channel !: number

  @Form({
    requiredString: true,
    maxLength: 200,
    textarea: true,
  })
  @Table()
  @Field({
    label: '通知地址',
  })
    url !: string

  @Form({
    maxLength: 200,
    textarea: true,
    placeholder: '将在发起请求时携带此令牌作为校验凭证',
  })
  @Field({
    label: '通知令牌',
  })
    token !: string

  @Search({
    orderNumber: -100,
    dataType: AirSearchDataType.TEXTAREA,
    hide: true,
  })
  @Form({
    textarea: true,
    orderNumber: -100,
    hide: true,
  })
  @Field({
    label: '备注信息',
  })
    remark!: string

  @Table({
    removed: false,
  })
  declare isDisabled: boolean
}
