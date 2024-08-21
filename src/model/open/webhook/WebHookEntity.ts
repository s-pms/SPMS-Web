import { BaseEntity } from '@/base/BaseEntity'
import { Dictionary, Field, Model } from '@/airpower/decorator/Custom'
import { Table } from '@/airpower/decorator/TableField'
import { Form } from '@/airpower/decorator/FormField'
import { WebHookTypeEnum } from '@/model/open/webhook/WebHookTypeEnum'
import { Search } from '@/airpower/decorator/SearchField'

@Model('通知')
export class WebHookEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    orderNumber: 99,
    forceShow: true,
  })
  @Field('场景') scene !: number

  @Search({
    orderNumber: -1,
  })
  @Form({
    requiredNumber: true,
  })
  @Table({
    forceShow: true,
    width: 100,
  })
  @Dictionary(WebHookTypeEnum)
  @Field('类型') type !: number

  @Form({
    requiredString: true,
    maxLength: 200,
    textarea: true,
  })
  @Table()
  @Field('网址') url !: string

  @Form({
    maxLength: 200,
    textarea: true,
    placeholder: '将在发起请求时携带此令牌作为校验凭证',
  })
  @Field('令牌') token !: string
}
