import { BaseEntity } from '@/base/BaseEntity'
import { Table } from '@/airpower/decorator/TableField'
import { Form } from '@/airpower/decorator/FormField'
import { WebHookTypeEnum } from '@/model/open/webhook/WebHookTypeEnum'
import { Search } from '@/airpower/decorator/SearchField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '通知',
})
export class WebHookEntity extends BaseEntity {
  @Form({
    requiredNumber: true,
  })
  @Table({
    orderNumber: 99,
    forceShow: true,
  })
  @Field({
    label: '场景',
  })
    scene !: number

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
  @Field({
    label: '类型',
    dictionary: WebHookTypeEnum,
  })
    type !: number

  @Form({
    requiredString: true,
    maxLength: 200,
    textarea: true,
  })
  @Table()
  @Field({
    label: '网址',
  })
    url !: string

  @Form({
    maxLength: 200,
    textarea: true,
    placeholder: '将在发起请求时携带此令牌作为校验凭证',
  })
  @Field({
    label: '令牌',
  })
    token !: string

  @Form({
    textarea: true,
    orderNumber: -100,
    hide: true,
  })
  @Field({
    label: '备注',
    type: String,
  })
    remark!: string
}
