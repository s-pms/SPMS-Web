import {
  Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { InventoryType } from './InventoryType'

@Model('库存')
export class InventoryEntity extends BaseEntity {
  @Table({
    forceShow: true,
  })
  @Field('物料编码') materialCode!: string

  @Table({ forceShow: true })
  @Field('物料名称') materialName!: string

  @Field('库存数量')
  @Table({
    align: 'right',
    width: 150,
    orderNumber: -2,
    forceShow: true,
  })
  @Type(Number) quantity!: number

  @Field('计量单位')
  @Table({
    width: 100,
    orderNumber: -3,
  })
  @Type(Number) unitName!: string

  @Field('存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @Table()
  @Field('存储资源') storageName!: string

  @Field('库存类型') type!: InventoryType

  @Field('存储资源')
  @Type(MaterialEntity) material!: MaterialEntity

  @Field('工厂结构')
  @Type(StructureEntity) structure!: StructureEntity
}
