import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'

@ClassName('销售价')
export class SalePriceEntity extends BaseEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @Type(CustomerEntity) customer!: CustomerEntity

  @TableField()
  @FieldName('物料编码') materialCode!: string

  @TableField()
  @FieldName('物料名称') materialName!: string

  @TableField()
  @FieldName('客户编码') customerName!: string

  @TableField()
  @FieldName('客户名称') customerCode!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料')
  @Type(Number) materialId!: number

  @FormField({
    requiredNumber: true,
  })
  @FieldName('客户')
  @Type(Number) customerId!: number

  @FieldName('销售单价')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    width: 150,
    suffixText: '元',
    align: 'right',
    orderNumber: -1,
  })
  @Type(Number) price!: number
}
