<p align="center">
<img src="https://cdn.hamm.cn/svg/spms/logo.svg"/>
</p>

<p align="center">
  <img src="https://svg.hamm.cn?key=Core&value=AirPower4T"/>
  <img src="https://svg.hamm.cn?key=Lang&value=TypeScript&bg=green"/>
  <img src="https://svg.hamm.cn?key=Base&value=Vue3"/>
  <img src="https://svg.hamm.cn?key=Build&value=Vite"/>
  <img src="https://svg.hamm.cn?key=UI&value=ElementPlus"/>
</p>
<p align="center">
<a href="https://github.com/s-pms/SPMS-Web">@Github</a> <a href="https://gitee.com/s-pms/SPMS-Web">@Gitee</a>
</p>

## 在线交流群

我们开通了QQ群 **773726377**，如果你对本项目有任何疑问，或者是在智能制造、工业互联网、物联网行业进行交流，欢迎加入我们的交流群。

## S-PMS介绍（前端项目）

**S-PMS** `(Smart Production Management System)`
**智能生产管理系统** ，是一个集成化、智能化的企业级应用软件，它集成了多个核心的生产管理模块，包括
**制造执行系统** `(MES, Manufacturing Execution System)`、
**仓库管理系统** `(WMS, Warehouse Management System)`、
**企业资源计划系统** `(ERP, Enterprise Resource Planning)`、
**质量管理系统** `(QMS, Quality Management System)` 以及
**物联网管理系统** `(IoTS,Internet of Things System)` 等。

- **MES (Manufacturing Execution System) 制造执行系统**
  ，主要用于车间层的生产活动优化管理，实时监控从订单下达到产品完成的整个生产过程，实现对生产数据的实时采集和分析，以提高生产效率、产品质量和资源利用率。

- **WMS (Warehouse Management System) 仓库管理系统**，用于全面管理和控制仓库业务流程，包括入库、出库、库存、盘点、批次管理等，实现仓库作业高效、准确、透明。

- **ERP (Enterprise Resource Planning) 企业资源计划系统**，整合了企业的所有资源，包括财务、采购、销售、生产、库存等各个环节的信息，为企业决策提供及时、准确的数据支持。

- **QMS (Quality Management System) 质量管理系统**，主要用于质量管理与控制，确保产品和服务满足规定以及客户期望的质量要求，包括质量策划、质量控制、质量保证及质量改进等活动。

- **IoTS（Internet of Things System) 物联网管理系统**，通过连接各种生产设备和传感器，收集海量实时数据，实现设备远程监控、预防性维护、生产过程智能化控制等功能。

通过将这些系统功能一体化整合在 **S-PMS** 中，企业可以实现从采购、生产、仓储到销售全流程的信息化、精细化、智能化管理，有效提升企业的整体运营效率和市场竞争力。

## 产品截图

<p align="center">
<img src="/docs/img/1.png" width="18%"/>
<img src="/docs/img/2.png" width="18%"/>
<img src="/docs/img/3.png" width="18%"/>
<img src="/docs/img/4.png" width="18%"/>
<img src="/docs/img/5.png" width="18%"/>
<img src="/docs/img/6.png" width="18%"/>
<img src="/docs/img/7.png" width="18%"/>
<img src="/docs/img/8.png" width="18%"/>
<img src="/docs/img/9.png" width="18%"/>
<img src="/docs/img/10.png" width="18%"/>
<img src="/docs/img/11.png" width="18%"/>
<img src="/docs/img/12.png" width="18%"/>
<img src="/docs/img/13.png" width="18%"/>
<img src="/docs/img/14.png" width="18%"/>
<img src="/docs/img/15.png" width="18%"/>
<img src="/docs/img/16.png" width="18%"/>
<img src="/docs/img/17.png" width="18%"/>
<img src="/docs/img/18.png" width="18%"/>
<img src="/docs/img/19.png" width="18%"/>
<img src="/docs/img/20.png" width="18%"/>
</p>

## 开发者指南

本仓库为 **S-PMS**
Web前端项目仓库，你可以查看 [开发者指南@Github](https://github.com/s-pms/SPMS-Docs)、[开发者指南@Gitee](https://gitee.com/s-pms/SPMS-Docs)
等帮助文档。

## 快速开始

### 环境准备

我们使用的是 `Vite` 构建, 包管理使用的是 `yarn`,
请先安装前叙的相关工具后继续接下来的操作 ：）

- 安装 **TypeScript** :

  ```shell
  npm install -D typescript
  ```

### 初始化仓库

建议windows开发者使用 `git bash` 不要使用windows自带的拉垮的 `cmd` `powershell` 等。否则接下来的脚本可能出现问题，你只能通过自己手动去操作。

- 通过**Github**代码仓库初始化

  ```shell
  git clone https://github.com/s-pms/SPMS-Web.git &&
  cd SPMS-Web &&
  git clone https://github.com/HammCn/AirPower4T.git airpower &&
  yarn && cp .env.dev .env && yarn s
  ```

- 通过**Gitee**代码仓库初始化(推荐)

  ```shell
  git clone https://gitee.com/s-pms/SPMS-Web.git &&
  cd SPMS-Web &&
  git clone https://gitee.com/air-power/AirPower4T.git airpower &&
  yarn && cp .env.dev .env && yarn s
  ```

### 修改环境变量

按需修改配置

```conf
VITE_APP_NAME = "开发环境"
VITE_APP_API_URL = "/api/"
VITE_APP_STATIC_URL = "/static/"
```

### 启动和打包

启动项目前，我们建议你关闭 `visual studio code` 的 `Vetur` 插件，避免 `vue2` 和 `vue3` 产生冲突。

```shell
# 启动项目
yarn s              #缩写指令

# 打包项目
yarn dev            #开发环境 使用.env.dev
yarn test           #测试环境 使用.env.test
yarn production     #生产环境 使用.env.production
```

### 其他命令

```shell
#使用标准commit模板
yarn c

#更新项目和AirPower
yarn u

#查看Git格式化日志
yarn l
```

### 推荐的VSCODE插件扩展

- Vue - Official
- ESLint
- SCSS Formatter

> 如碰到其他兼容问题，建议在工作区禁用以上三个插件之外的其他插件，特别是`Vetur`。

## 联系我们

**S-PMS** 所有代码均在 **MIT** 开源协议规范下免费提供，你可以放心使用。

如果有定制需求，欢迎联系我们：

Email: admin#hamm.cn
