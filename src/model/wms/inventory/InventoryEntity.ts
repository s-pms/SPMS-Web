import {
  ClassName, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { InventoryType } from './InventoryType'

@ClassName('库存')
export class InventoryEntity extends BaseEntity {
  @TableField({
    forceShow: true,
  })
  @FieldName('物料编码') materialCode!: string

  @TableField({ forceShow: true })
  @FieldName('物料名称') materialName!: string

  @FieldName('库存数量')
  @TableField({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @FieldName('计量单位')
  @TableField({
    width: 100,
    orderNumber: -3,
  })
  @Type(Number) unitName!: string

  @FieldName('存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @TableField()
  @FieldName('存储资源') storageName!: string

  @FieldName('库存类型') type!: InventoryType

  @FieldName('存储资源')
  @Type(MaterialEntity) material!: MaterialEntity

  @FieldName('工厂结构')
  @Type(StructureEntity) structure!: StructureEntity
}
