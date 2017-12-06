## 介绍

- 服务端渲染
  - 整合了Vue + vue-router + vuex
  - 服务器端数据获取
    - 在服务器端渲染数据前会去检查组件是否存在preFetch方法，这个方法接受vuex的store做为参数，在action中异步获取数据后存入store，渲染时会将store重点数据同步回前端页面中。
- 单文件Vue组件
  - 开发阶段热重载
  - 上线配置会将CSS分离到一个单独的文件中去

## 目录文件结构

- build webpack配置文件及开发服务器配置
  - setup-dev-server.js 开发服务器配置文件
  - vue-loader.config.js vue-loader的配置
  - webpack.base.config.js webpack公共配置
  - webpack.client.config.js webpack客户端代码生成配置
  - webpack.server.config.js webpack服务器端代码生成配置
- src 源代码文件夹
  - common 公共方法
  - components 公共组件和各页面使用的组件
  - filters 公用过滤器的定义
  - images 图片文件夹，用到的图片如果小于10KB会被转译成base64编码进css文件，具体可以看webpack的配置
  - router 前端路由的配置文件
  - services 访问中间层API的方法集合
  - store vuex相关数据和方法文件
  - styles 公共样式表
  - views 页面组件文件夹
  - app.js 前端应用入口文件
  - App.vue 入口组件
  - client-entry.js 客户端编译入口文件
  - index.template.html 静态首页注入文件
  - server-entry.js 服务器端编译入口文件
- .babelrc babel编译的配置
- .gitignore git的忽略文件
- apps.js 项目启动入口文件
- package.json npm的配置及依赖包配置文件

## 注意
 - 现在用的vue-touch是beta版本，注意升级

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

## Build Setup

**需要 Node.js 6+**

``` bash
# 安装依赖包
npm install # or yarn

# 启动开发模式的服务器，端口地址 localhost:8080
npm run dev

# 预发环境编译
npm run build-stage

# 在本地启动预发环境，端口地址和运维配置一致，例如新手Q：localhost:7042/qqflightnew/
npm run start-stage

# 线上环境编译
npm run build

# 在本地启动线上环境，端口地址和预发一致。
npm start

```
