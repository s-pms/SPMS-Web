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
<a href="">@Github</a> <a href="">@Gitee</a> <a href="">版本发布</a> <a href="./PLAN.md">开发计划</a> 
</p>

# SPMS介绍

**SPMS** `(Smart Production Management System)` 即 **智能生产管理系统** ，是一个集成化、智能化的企业级应用软件，它集成了多个核心的生产管理模块，包括 **制造执行系统** `(MES, Manufacturing Execution System)`、**仓库管理系统** `(WMS, Warehouse Management System)`、**企业资源计划系统** `(ERP, Enterprise Resource Planning)`、**质量管理系统** `(QMS, Quality Management System)` 以及 **物联网管理系统** `(IoTS,Internet of Things System)` 等。

- **MES (Manufacturing Execution System) 制造执行系统**，主要用于车间层的生产活动优化管理，实时监控从订单下达到产品完成的整个生产过程，实现对生产数据的实时采集和分析，以提高生产效率、产品质量和资源利用率。

- **WMS (Warehouse Management System) 仓库管理系统**，用于全面管理和控制仓库业务流程，包括入库、出库、库存、盘点、批次管理等，实现仓库作业高效、准确、透明。

- **ERP (Enterprise Resource Planning) 企业资源计划系统**，整合了企业的所有资源，包括财务、采购、销售、生产、库存等各个环节的信息，为企业决策提供及时、准确的数据支持。

- **QMS (Quality Management System) 质量管理系统**，主要用于质量管理与控制，确保产品和服务满足规定以及客户期望的质量要求，包括质量策划、质量控制、质量保证及质量改进等活动。

- **IoTS（Internet of Things System) 物联网管理系统**，通过连接各种生产设备和传感器，收集海量实时数据，实现设备远程监控、预防性维护、生产过程智能化控制等功能。

通过将这些系统功能一体化整合在 **SPMS** 中，企业可以实现从采购、生产、仓储到销售全流程的信息化、精细化、智能化管理，有效提升企业的整体运营效率和市场竞争力。

# 开发计划

请点击这里查看我们的开发计划: [SPMS开发计划](./plan.md)

# 前端仓库使用说明

### 初始化仓库

> 建议windows开发者使用 ```git bash``` 不要使用windows自带的拉垮的 ```cmd``` ```powershell``` 等。否则接下来的脚本可能出现问题，你只能通过自己手动去操作。

1. ssh方式

```shell
git clone git@gitee.com:smart-pms/SPMS-Web.git &&
cd SPMS-Web/src && 
git clone git@gitee.com:air-power/AirPower4T.git airpower && cd ../ &&
yarn && cp .env.template .env && yarn s
```

2. https方式

```shell
git clone https://gitee.com/smart-pms/SPMS-Web.git &&
cd SPMS-Web/src && 
git clone https://gitee.com/air-power/AirPower4T.git airpower && cd ../ &&
yarn && cp .env.template .env && yarn s
```


#### 修改环境变量

按需修改配置
```conf
VITE_APP_NAME = "开发环境"
VITE_APP_API_URL = "/api/"
VITE_APP_STATIC_URL = "/static/"
```

#### 启动和打包

启动项目前，我们建议你关闭 ```visual studio code``` 的 ```Vetur``` 插件，避免 ```vue2``` 和 ```vue3``` 产生冲突。


```shell
# 启动项目
yarn s              #缩写指令

# 打包项目
yarn dev            #开发环境 使用.env.dev
yarn test           #测试环境 使用.env.test
yarn production     #生产环境 使用.env.production
```

#### 其他命令

```shell
#使用标准commit模板
yarn c   

#更新项目和AirPower
yarn u   

#查看Git格式化日志
yarn l           
```

#### 推荐的VSCODE插件扩展

- Vue - Official
- ESLint
- SCSS Formatter

> 如碰到其他兼容问题，建议在工作区禁用以上四个插件之外的其他插件，特别是```Vetur```。

