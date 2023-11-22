import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@ClassName('采购明细')
export class PurchaseDetailEntity extends AbstractBaseBillDetailEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @Type(SupplierEntity) supplier!: SupplierEntity

  @TableField()
  @FieldName('物料编码') materialCode!: string

  @TableField()
  @FieldName('物料名称') materialName!: string

  @TableField()
  @FieldName('供应商名称') supplierName!: string

  @TableField()
  @FieldName('供应商编码') supplierCode!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料')
  @Type(Number) materialId!: number

  @FormField({
    requiredNumber: true,
  })
  @FieldName('供应商')
  @Type(Number) supplierId!: number

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

  @FieldName('采购数量')
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

  @FieldName('已采购数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number

  billId!: number
}
