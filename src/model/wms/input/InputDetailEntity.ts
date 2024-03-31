import { ClassName, FieldName, Type } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'

@ClassName('入库明细')
export class InputDetailEntity extends AbstractBaseBillDetailEntity {
  billId!: number

  @Type(StorageEntity) storage!: StorageEntity

  @Type(MaterialEntity) material!: MaterialEntity

  @TableField({ forceShow: true })
  @FieldName('物料编码') materialCode!: string

  @TableField({ forceShow: true })
  @FieldName('物料名称') materialName!: string

  @TableField({ forceShow: true })
  @FieldName('目标存储资源') storageName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('物料')
  @Type(Number) materialId!: number

  @FieldName('入库数量')
  @FormField({
    requiredNumber: true,
    number: true,
  })
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @FieldName('已入库数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -3,
  })
  @Type(Number) finishQuantity!: number

  @FormField({
    requiredNumber: true,
  })
  @FieldName('目标存储资源') storageId !: number
}
