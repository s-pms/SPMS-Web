import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'

@ClassName('销售明细')
export class SaleDetailEntity extends BaseEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @TableField()
  @FieldName('物料编码') materialCode!: string

  @TableField()
  @FieldName('物料名称') materialName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料')
  @Type(Number) materialId!: number

  @FieldName('采购单价')
  @FormField({
    requiredNumber: true,
    number: true,
    suffixText: '元',
  })
  @TableField({
    width: 150,
    suffixText: '元',
    align: 'right',
    orderNumber: -1,
  })
  @Type(Number) price!: number

  @FieldName('销售数量')
  @FormField({
    requiredNumber: true,
    number: true,
    suffixText: '-',
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Type(Number) quantity!: number

  @FieldName('已出库数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -3,
    hide: true,
  })
  @Type(Number) outputQuantity!: number

  @Type(CustomerEntity) customer!: CustomerEntity
}
