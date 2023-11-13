import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { PlanDetailEntity } from './PlanDetailEntity'
import { PlanStatus } from './PlanStatus'
import { PlanStatusDictionary } from './PlanStatusDictionary'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { PlanType } from './PlanType'
import { PlanTypeDictionary } from './PlanTypeDictionary'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeType } from '@/airpower/enum/AirDateTimeType'

@ClassName('生产计划')
export class PlanEntity extends AbstractBaseBillEntity<PlanDetailEntity> {
  @TableField()
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @FieldName('生产计划号') billCode!: string

  @TableField()
  @FieldName('客户编码') customerCode!: string

  @TableField()
  @FieldName('客户名称') customerName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('客户信息') customerId!: number

  @TableField({
    width: 100,
    showColor: true,
  })
  @Dictionary(PlanStatusDictionary)
  @FieldName('计划状态') status!: PlanStatus

  @TableField({
    width: 100,
    showColor: true,
  })
  @FormField({
    defaultValue: PlanType.SALE,
    clearable: false,
    requiredNumber: true,
  })
  @Dictionary(PlanTypeDictionary)
  @FieldName('计划类型') type!: PlanType

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FormField({
    defaultValue: AirDateTime.getMilliTimeStamps(),
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FieldName('开始时间') startTime!: number

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FormField({
    requiredNumber: true,
    dateType: AirDateTimeType.DATE,
    dateShowFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FieldName('交付时间') deliverTime!: number

  @TableField({
    width: 110,
    showColor: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD,
  })
  @FieldName('完成时间') finishTime!: number

  @FieldName('计划明细')
  @Type(PlanDetailEntity, true) details: PlanDetailEntity[] = []

  @Type(CustomerEntity)
  @FieldName('客户信息') customer!: CustomerEntity
}
