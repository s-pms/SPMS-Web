import {Field, Form, Model, Search, Table} from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { CertificateTypeEnum } from '@/model/asset/contract/participant/CertificateTypeEnum'
import { ParticipantRoleEnum } from '@/model/asset/contract/participant/ParticipantRoleEnum'
import { ParticipantTypeEnum } from '@/model/asset/contract/participant/ParticipantTypeEnum'

@Model({
  label: '参与方',
})
export class ParticipantEntity extends BaseEntity {
  @Search({
    width: 90,
  })
  @Table({
    color: true,
    order: 100,
    width: 80,
    force: true,
  })
  @Field({
    label: '身份',
    dictionary: ParticipantRoleEnum,
  })
  @Form({
    defaultValue: ParticipantRoleEnum.A.key,
    clearable: false,
  })
  role!: number

  @Table({
    force: true,
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
  @Field({
    label: '邮箱',
  })
  email!: string

  @Table({
    copy: true,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '证件号',
  })
  identification!: string

  @Search({
    width: 120,
  })
  @Table({
    color: true,
    width: 80,
    force: true,
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

  @Search({
    width: 130,
  })
  @Table({
    color: true,
    width: 120,
    force: true,
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
