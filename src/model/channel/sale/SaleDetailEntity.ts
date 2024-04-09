import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@ClassName('销售明细')
export class SaleDetailEntity extends AbstractBaseBillDetailEntity {
  billId!: number

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

  @FieldName('销售数量')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
  })
  @Type(Number) quantity!: number

  @Type(Number) finishQuantity!: number

  @Type(CustomerEntity) customer!: CustomerEntity
}
