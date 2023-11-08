import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'

@ClassName('采购价')
@EntityConfig({
  permissionPrefix: 'purchasePrice_',
})
export class PurchasePriceEntity extends BaseEntity {
  @Type(MaterialEntity) material!: MaterialEntity

  @Type(SupplierEntity) supplier!: SupplierEntity

  @TableField()
  @FieldName('物料编码') materialCode!: string

  @TableField()
  @FieldName('物料名称') materialName!: string

  @TableField()
  @FieldName('供应商名称') supplierName!: string

  @TableField()
  @FieldName('供应商名称') supplierCode!: string

  @FormField({
    requiredNumber: true,
  })
  @Type(Number) materialId!: number

  @FormField({
    requiredNumber: true,
  })
  @Type(Number) supplierId!: number

  @FieldName('采购价')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    suffixText: '元',
    align: 'right',
  })
  @Type(Number) purchasePrice!: number
}
