import type { IPayload } from '@airpower/web'
import { DateTimeFormatter, DateTimeType, DateTimeUtil, Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { ContractStatusEnum } from '@/model/asset/contract/ContractStatusEnum'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'

import { ContractTypeEnum } from './ContractTypeEnum'

@Model({
  label: '合同',
})
export class ContractEntity extends BaseEntity implements IPayload {
  @Table({
    copy: true,
    force: true,
    order: 200,
    width: 200,
  })
  @Search()
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '合同编码',
  })
  code!: string

  @Table({
    color: true,
    width: 100,
    order: 160,
  })
  @Form({
    clearable: false,
    defaultValue: ContractTypeEnum.OTHER.key,
    requiredNumber: true,
  })
  @Search({
    width: 120,
  })
  @Field({
    label: '合同类型',
    dictionary: ContractTypeEnum,
  })
  type!: number

  @Table({
    force: true,
    order: 150,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '合同名称',
  })
  name!: string

  @Form({
    textarea: true,
    maxLength: 20000,
  })
  @Field({
    label: '合同内容',
  })
  content!: string

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
  })
  @Form({
    defaultValue: DateTimeUtil.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: DateTimeType.DATE,
    dateShowFormatter: DateTimeFormatter.FULL_DATE,
    dateFormatter: DateTimeFormatter.TIMESTAMP,
  })
  @Field({
    label: '开始时间',
  })
  startTime!: number

  @Table({
    width: 110,
    color: true,
    datetime: DateTimeFormatter.FULL_DATE,
  })
  @Form({
    defaultValue: DateTimeUtil.getMilliTimeStamps() + DateTimeUtil.SECOND_PER_DAY * DateTimeUtil.DAY_PER_YEAR * DateTimeUtil.MILLISECONDS_PER_SECOND,
    requiredNumber: true,
    dateType: DateTimeType.DATE,
    dateShowFormatter: DateTimeFormatter.FULL_DATE,
    dateFormatter: DateTimeFormatter.TIMESTAMP,
  })
  @Field({
    label: '终止时间',
  })
  endTime!: number

  /**
   * # 合同状态
   */
  @Search({
    width: 120,
  })
  @Table({
    color: true,
    width: 100,
  })
  @Field({
    label: '合同状态',
    dictionary: ContractStatusEnum,
  })
  status!: number

  @Field({
    label: '参与方',
  })
  @Type(ParticipantEntity, true)
  participantList: ParticipantEntity[] = []

  @Field({
    label: '附件',
  })
  @Type(ContractDocumentEntity, true)
  documentList: ContractDocumentEntity[] = []

  getPayloadLabel(): string {
    return `${this.name}(${this.code})`
  }
}
