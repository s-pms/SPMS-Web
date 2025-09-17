import { Field } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'

export class PersonalTokenEntity extends BaseEntity {
  @Field({
    label: '令牌名称',
  })
  name!: string

  @Field({
    label: '令牌',
  })
  token!: string
}
