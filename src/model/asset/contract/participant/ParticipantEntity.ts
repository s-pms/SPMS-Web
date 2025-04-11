import { BaseEntity } from '@/base/BaseEntity'
import { CertificateTypeEnum } from '@/model/asset/contract/participant/CertificateTypeEnum'
import { ParticipantTypeEnum } from '@/model/asset/contract/participant/ParticipantTypeEnum'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'

@Model({
  label: '参与方',
})
export class ParticipantEntity extends BaseEntity {
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '名称',
  })
  name!: string

  @Table({})
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '联系电话',
  })
  phone!: string

  @Table({
    hide: true,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '邮箱',
  })
  email!: string

  @Table({
    copyField: true,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '证件号',
  })
  identification!: string

  @Search()
  @Table({
    showColor: true,
    width: 80,
    forceShow: true,
  })
  @Field({
    label: '身份类型',
    dictionary: ParticipantTypeEnum,
  })
  @Form({
    defaultValue: ParticipantTypeEnum.PERSONAL.key,
    clearable: false,
  })
  type!: number

  @Search()
  @Table({
    showColor: true,
    width: 120,
    forceShow: true,
  })
  @Form({
    clearable: false,
    defaultValue: CertificateTypeEnum.CHINESE_ID_CARD.key,
  })
  @Field({
    label: '证件类型',
    dictionary: CertificateTypeEnum,
  })
  certificateType!: number
}
