import { Field, Model, Table } from '@airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'

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
    label: '仓库',
    type: StorageEntity,
  })
    storage!: StorageEntity

  @Table()
  @Field({
    label: '仓库',
  })
    storageName!: string

  @Table()
  @Field({
    label: '生产单元',
  })
    structureName!: string

  @Field({
    label: '库存类型',
    dictionary: InventoryTypeEnum,
  })
    type!: number

  @Field({
    label: '物料信息',
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Field({
    label: '生产单元',
    type: StructureEntity,
  })
    structure!: StructureEntity
}
