import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { SaleStatus } from './SaleStatus'
import { SaleStatusDictionary } from './SaleStatusDictionary'
import { SaleDetailEntity } from './SaleDetailEntity'
import { CustomerEntity } from '../customer/CustomerEntity'

@ClassName('销售单')
export class SaleEntity extends BaseEntity {
  @TableField()
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @FieldName('销售单号') billCode!: string

  @TableField()
  @FieldName('客户编码') customerCode!: string

  @TableField()
  @FieldName('客户名称') customerName!: string

  @FormField({
    requiredNumber: true,
    placeholder: '请选择销售客户',
  })
  @FieldName('客户') customerId!: number

  @TableField({
    nowrap: true,
  })
  @FormField({
    textarea: true,
    maxLength: 80,
  })
  @FieldName('销售说明') reason!: string

  @TableField({
    width: 100,
    suffixText: '元',
    align: 'right',
  })
  @FormField({
    suffixText: '元',
  })
  @FieldName('总金额') totalPrice!: number

  @TableField({
    width: 100,
    showColor: true,
  })
  @Dictionary(SaleStatusDictionary)
  @FieldName('销售状态') status!: SaleStatus

  @FieldName('销售明细')
  @Type(SaleDetailEntity, true) details: SaleDetailEntity[] = []

  @FieldName('客户')
  @Type(CustomerEntity) customer!: CustomerEntity
}
