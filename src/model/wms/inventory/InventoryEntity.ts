import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { Field, Model, Table, Type } from '@airpower/web'

@Model({
  label: '库存',
})
export class InventoryEntity extends BaseEntity {
  @Table({
    force: true,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({ force: true })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Table({
    align: 'right',
    width: 150,
    order: -2,
    force: true,
  })
  @Field({
    label: '库存数量',
  })
  quantity!: number

  @Table({
    width: 100,
    order: -3,
  })
  @Field({
    label: '计量单位',
  })
  unitName!: string

  @Field({
    label: '仓库',
  })
  @Type(StorageEntity)
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
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Field({
    label: '生产单元',
  })
  @Type(StructureEntity)
  structure!: StructureEntity
}
