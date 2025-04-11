import type { IPayload } from '@airpower/interface/IPayload'
import { BaseEntity } from '@/base/BaseEntity'
import { ContractStatusEnum } from '@/model/asset/contract/ContractStatusEnum'
import { ContractDocumentEntity } from '@/model/asset/contract/document/ContractDocumentEntity'
import { ParticipantEntity } from '@/model/asset/contract/participant/ParticipantEntity'
import { BooleanYesNoDictionary } from '@/model/common/BooleanYesNoDictionary'
import { AirConstant } from '@airpower/config/AirConstant'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'
import { AirDateTimeFormatter } from '@airpower/enum/AirDateTimeFormatter'
import { AirDateTimeType } from '@airpower/enum/AirDateTimeType'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import { ContractTypeEnum } from './ContractTypeEnum'

@Model({
  label: '合同',
})
export class ContractEntity extends BaseEntity implements IPayload {
  @Table({
    copyField: true,
    forceShow: true,
    orderNumber: 200,
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
    showColor: true,
    width: 100,
    orderNumber: 160,
  })
  @Form({
    clearable: false,
    defaultValue: ContractTypeEnum.OTHER.key,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '合同类型',
    dictionary: ContractTypeEnum,
  })
  type!: number

  @Table({
    forceShow: true,
    orderNumber: 150,
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
  @Search()
  @Field({
    label: '合同内容',
  })
  content!: string

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Form({
    defaultValue: AirDateTime.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field({
    label: '开始时间',
  })
  startTime!: number

  @Table({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Form({
    defaultValue: AirDateTime.getMilliTimeStamps() + AirConstant.SECOND_PER_DAY * AirConstant.DAY_PER_YEAR * AirConstant.MILLISECONDS_PER_SECOND,
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @Field({
    label: '终止时间',
  })
  endTime!: number

  @Search()
  @Table({
    showColor: true,
    width: 100,
  })
  @Field({
    label: '合同状态',
    dictionary: ContractStatusEnum,
  })
  status!: number

  @Table({
    showColor: true,
    width: 50,
  })
  @Field({
    label: '模板',
    type: Boolean,
    dictionary: BooleanYesNoDictionary,
  })
  @Search({
    orderNumber: -1,
    hide: true,
  })
  @Form({
    defaultValue: false,
  })
  isTemplate!: boolean

  @Field({
    label: '参与方',
    type: ParticipantEntity,
    array: true,
  })
  participantList: ParticipantEntity[] = []

  @Field({
    label: '附件',
    type: ContractDocumentEntity,
    array: true,
  })
  documentList: ContractDocumentEntity[] = []

  getPayloadLabel(): string {
    return `${this.name}(${this.code})`
  }
}
