# SPMS-Web 开发规范

> 本文档供 AI 编程助手（如 Qwen Code、Cursor、GitHub Copilot 等）参考，遵循本文档规范可以保证代码风格一致。使用 VibeCoding 开发时请严格遵循本文档约定。

## 项目概述

SPMS-Web 是 SPMS 智能生产管理系统的 Web 前端项目，基于 **Vue 3 + TypeScript + Vite** 开发，使用 **Element Plus** 作为 UI 组件库，依赖 **@airpower/web** 基础框架。

## 技术栈

| 技术          | 版本  | 用途                               |
| ------------- | ----- | ---------------------------------- |
| Vue           | 3.5+  | 前端框架 (Composition API + setup) |
| TypeScript    | 5.9+  | 类型系统                           |
| Vite          | 7.3+  | 构建工具                           |
| Element Plus  | 2.12+ | UI 组件库                          |
| Pinia         | 3.0+  | 状态管理                           |
| Vue Router    | 4.6+  | 路由                               |
| @airpower/web | 2.9+  | 基础框架 (CRUD组件、Hooks、工具)   |
| Axios         | 1.13  | HTTP 客户端                        |
| ECharts       | 6.0   | 图表                               |
| SCSS          | 1.96+ | 样式预处理                         |
| ESLint        | 9.39+ | 代码检查 (@antfu/eslint-config)    |

## 项目结构

```
src/
├── assets/          # 静态资源 (css, images等)
├── base/            # 抽象基类
│   ├── AbstractBaseService.ts    # 服务基类
│   └── BaseEntity.ts             # 实体基类
├── component/       # 全局公共组件
├── config/          # 应用配置
│   ├── AppConfig.ts    # 应用配置
│   ├── Constant.ts     # 常量
│   └── routes.ts       # 路由配置
├── hook/            # 自定义 Hooks
│   └── useMyTable.ts  # 表格Hook封装
├── model/           # 数据模型 (Entity, Service, Enum)
├── view/            # 页面视图
├── App.vue
├── env.d.ts
└── main.ts
```

## 目录分层规范

### 1. model/ - 数据模型层

**结构**:
```
model/
├── business-module/        # 业务模块 (如 asset, channel, factory, mes 等)
│   ├── function-module/    # 功能模块 (如 material, device, storage 等)
│   │   ├── XxxEntity.ts       # 实体类
│   │   ├── XxxService.ts      # 服务类
│   │   ├── XxxTypeEnum.ts     # 枚举类 (可选)
│   │   └── ...
```

**规范**:
- 按业务模块 → 功能模块二级分组
- 命名：
  - 实体: `XxxEntity.ts` (PascalCase)
  - 服务: `XxxService.ts` (PascalCase)
  - 枚举: `XxxEnum.ts` (PascalCase)

### 2. view/ - 视图层

**结构**:
```
view/console/business-module/function-module/
├── component/              # 局部组件
│   ├── editor.vue          # 编辑器弹窗
│   ├── selector.vue        # 选择器弹窗 (可选)
│   └── detail.vue          # 详情查看 (可选)
└── list.vue               # 列表页面
```

**规范**:
- 列表页: `list.vue` (kebab-case)
- 编辑器弹窗: `editor.vue`
- 选择器弹窗: `selector.vue`
- 详情组件: `detail.vue`
- 局部组件放入 `component/` 子目录

## 编码规范

### 格式规范

| 规则          | 取值     |
| ------------- | -------- |
| 缩进          | 2 空格   |
| 分号          | 不使用   |
| 引号          | 单引号   |
| Trailing 逗号 | 自动保留 |

### 命名规范

| 类型      | 规范                | 示例                                |
| --------- | ------------------- | ----------------------------------- |
| 类        | PascalCase          | `MaterialEntity`, `MaterialService` |
| 枚举类    | PascalCase          | `MaterialTypeEnum`                  |
| 枚举常量  | UPPER_SNAKE_CASE    | `PRODUCT`, `PURCHASE`               |
| 接口/类型 | PascalCase (前缀 I) | `IBaseTableResult`                  |
| 函数/变量 | camelCase           | `useMyTable`, `onPublish`           |
| TS 文件   | PascalCase          | `MaterialEntity.ts`                 |
| Vue 文件  | kebab-case          | `editor.vue`, `list.vue`            |

### 类型规范

- **必须**声明类型，不使用 `any`
- 确定有值时使用非空断言 `!`
- 泛型正确传递类型参数

### 导入路径规范

- 使用 `@/` 别名开头指向 `src/`
- 同级导入使用相对路径 `./`
- 第三方包直接导入

**正确示例**:
```typescript
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from './MaterialEntity'
import { WebEnum } from '@airpower/web'
```

## Vue 组件规范

### 块顺序 (强制校验)

强制顺序：`script` → `template` → `style`

```vue
<script lang="ts" setup>
// ...
</script>

<template>
  <!-- ... -->
</template>

<style lang="scss" scoped></style>
```

### 属性换行 (强制校验)

- 单行最多 1 个属性
- 多行每个属性占一行

**正确示例**:
```vue
<ATable
  :use-hook="hook"
  show-export
/>
```

### Script Setup 规范

- **必须**使用 `<script lang="ts" setup>`
- 弹窗 Props 使用 `DialogProps.withParam()`
- 充分利用 TypeScript 类型推断

```typescript
const props = defineProps(DialogProps.withParam(new MaterialEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, MaterialService)
```

## AirPower 装饰器规范

### 装饰器顺序 (必须遵循)

```typescript
@Model({ label: '物料' })
export class MaterialEntity extends BaseEntity {
  @Table({ ... })  // 1. 表格配置
  @Form({ ... })    // 2. 表单配置
  @Search({ ... })  // 3. 搜索配置
  @Field({ ... })   // 4. 字段标记
  name!: string
}
```

### 常用装饰器配置说明

| 装饰器    | 用途       | 常用配置项                                                                                                  |
| --------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `@Model`  | 类标记     | `label` - 类标签                                                                                            |
| `@Field`  | 字段标记   | `label` - 字段标签，`dictionary` - 枚举字典                                                                 |
| `@Table`  | 表格列配置 | `width` - 宽度，`force` - 强制显示，`copy` - 可复制，`datetime` - 日期格式化，`color` - 染色                |
| `@Form`   | 表单配置   | `requiredString`/`requiredNumber`/`requiredPayload` - 必填，`defaultValue` - 默认值，`placeholder` - 占位符 |
| `@Search` | 搜索配置   | `width` - 宽度，`hide` - 是否隐藏                                                                           |
| `@Type`   | 类型标记   | 标记 Payload 实体类型                                                                                       |

## 各类文件开发规范

### 1. 枚举规范

- 继承 `WebEnum`
- 使用 `static readonly` 声明常量
- 调用 `setColor()` 设置颜色

**示例**:
```typescript
import { WebColor, WebEnum } from '@airpower/web'

export class MaterialTypeEnum extends WebEnum {
  static readonly PRODUCT = new MaterialTypeEnum(1, '自产品')
    .setColor(WebColor.SUCCESS)

  static readonly PURCHASE = new MaterialTypeEnum(2, '外购品')
    .setColor(WebColor.WARNING)
}
```

### 2. 服务类规范

- 继承 `AbstractBaseService<E>`，E 为实体类型
- 指定 `entityClass` 为实体类
- 指定 `baseUrl` 为 API 基础路径（不需要 `/api` 前缀）

**示例**:
```typescript
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from './MaterialEntity'

export class MaterialService extends AbstractBaseService<MaterialEntity> {
  entityClass = MaterialEntity
  baseUrl = 'material'
}
```

### 3. 实体类规范

- 继承 `BaseEntity`
- 需要被选择器选择时**实现** `IPayload` 接口
- 实现 `getPayloadLabel()` 方法返回显示文本

**示例**:
```typescript
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'
import { UnitEntity } from './UnitEntity'

@Model({
  label: '物料',
})
export class MaterialEntity extends BaseEntity implements IPayload {
  @Table({ copy: true, force: true })
  @Form({ requiredString: true })
  @Search()
  @Field({ label: '物料名称' })
  name!: string

  @Table({ copy: true })
  @Form({ placeholder: '不输入按编码规则自动生成' })
  @Search()
  @Field({ label: '物料编码' })
  code!: string

  @Table({ color: true, width: 100 })
  @Form({ clearable: false, defaultValue: MaterialTypeEnum.PRODUCT.key, requiredNumber: true })
  @Search({ width: 120 })
  @Field({ label: '物料类型', dictionary: MaterialTypeEnum })
  materialType!: number

  @Table({ payload: true, width: 150 })
  @Form({ requiredPayload: true })
  @Type(UnitEntity)
  @Field({ label: '计量单位' })
  unit!: UnitEntity

  getPayloadLabel(): string {
    return `${this.name}(${this.code})`
  }
}
```

### 4. Hooks 规范

- 放在 `src/hook/` 目录
- 命名 `useXxx` (camelCase)
- 使用泛型约束类型

**示例**:
```typescript
export function useMyTable<E extends BaseEntity, S extends AbstractBaseService<E>>(
  serviceClass: CurdServiceConstructor<E, S>,
  option: ITableOption<E> = {},
): IBaseTableResult<E, S> {
  // ...
}
```

## 页面开发流程

### 第一步：开发列表页面 (list.vue)

```vue
<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { MaterialEditor } from './component'

const hook = useMyTable(MaterialService, {
  editView: MaterialEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
      show-export
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
```

### 第二步：开发编辑器弹窗 (component/editor.vue)

```vue
<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'

const props = defineProps(DialogProps.withParam(new MaterialEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, MaterialService)
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField field="name" />
      <AFormField field="code" />
      <AFormField field="materialType" />
      <AFormField field="spc" />
    </el-form>
  </ADialog>
</template>
```

### 第三步：开发选择器弹窗 (component/selector.vue) (可选)

```vue
<script lang="ts" setup>
import { ADialog, ATable, useSelector } from '@airpower/web'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'

const props = defineProps(DialogProps.withParam(new MaterialEntity()))

const {
  title,
  hook,
  onConfirm,
} = useSelector(props, MaterialService)
</script>

<template>
  <ADialog
    :title="title"
    @confirm="onConfirm"
    width="800px"
  >
    <APanel>
      <ATable
        :use-hook="hook"
        :is-select="true"
      />
    </APanel>
  </ADialog>
</template>
```

## 新增功能完整 Checklist

- [ ] 在 `model/business-module/function-module/` 创建实体类
- [ ] 在同目录创建服务类
- [ ] (如果需要) 创建枚举类
- [ ] 在 `view/console/business-module/function-module/` 创建 `list.vue`
- [ ] 在同目录创建 `component/editor.vue`
- [ ] (如果需要) 创建 `component/selector.vue`
- [ ] 运行 `yarn lint` 检查代码格式
- [ ] 测试功能正常运行

## 可用命令

```bash
# 启动开发服务器
yarn s

# ESLint 自动修复代码格式
yarn lint

# 生产构建
yarn production
```

## 构建配置

- `minify: false` - 关闭代码压缩（AirPower 需要反射获取类名）
- 代理 `/api` → `http://127.0.0.1:8080/`
- 开发端口 `3000`

## Git 规范

- 提交信息清晰描述变更内容
- 优先按功能模块单独提交
- 不提交 `node_modules`、`dist`、`.idea`、`.vscode`

## 最佳实践

1. ✅ **复用基础组件**: 优先使用 `@airpower/web` 提供的 `APanel`、`ATable`、`ADialog`、`AFormField`、`ASelect` 等组件
2. ✅ **复用 Hooks**: 使用 `useTable`、`useEditor`、`useSelector`、`useMyTable` 等封装好的 Hooks
3. ✅ **业务分层**: 模型在 `model/`，页面在 `view/`，业务逻辑在 Service，不要在页面写过多逻辑
4. ✅ **类型安全**: 充分利用 TypeScript 类型系统，不使用 `any`
5. ✅ **继承基类**: 实体继承 `BaseEntity`，服务继承 `AbstractBaseService`，获得通用能力
6. ✅ **使用装饰器**: 正确使用 `@Table` → `@Form` → `@Search` → `@Field` 装饰器，框架自动生成表格和表单
7. ✅ **遵循约定**: 保持项目目录结构和命名规范，便于维护

---

**AI 开发提示**: 在使用 VibeCoding 开发时，请将本文档作为系统提示的一部分，让 AI 遵循此开发规范。每次开发前，AI 都应该回顾本文档，确保输出的代码符合项目约定。
