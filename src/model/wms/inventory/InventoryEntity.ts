import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '库存',
})
export class InventoryEntity extends BaseEntity {
  @Table({
    forceShow: true,
  })
  @Field({
    label: '物料编码',
  })
    materialCode!: string

  @Table({ forceShow: true })
  @Field({
    label: '物料名称',
  })
    materialName!: string

  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Field({
    label: '库存数量',
  })
    quantity!: number

  @Table({
    width: 100,
    orderNumber: -3,
  })
  @Field({
    label: '计量单位',
  })
    unitName!: string

  @Field({
    label: '存储资源',
    type: StorageEntity,
  })
    storage!: StorageEntity

  @Table()
  @Field({
    label: '存储资源',
  })
    storageName!: string

  @Field({
    label: '库存类型',
    dictionary: InventoryTypeEnum,
  })
    type!: number

  @Field({
    label: '存储资源',
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Field({
    label: '工厂结构',
    type: StructureEntity,
  })
    structure!: StructureEntity
}
