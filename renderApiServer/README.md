# Swagger v3 接口代码生成器

## 环境
* node v14.18.0
* npm 6.14.15
* ejs 3.1.9
* prettier 3.1.1

## 启动使用

* 进入根目录`./utils/constant.js`修改配置文件
* 当前目录下在控制台输入`node index.js`命令

## 文件目录说明

* renderApiTypes.js 生成interface目录，内容为：所有自定义的类型文件，
* renderController.js 生成controller目录，内容为：api文件，

## 生成vue文件说明(目录名称renderVue)

* 后端需要将每个类型中的字段**描述**写上。列表和详情页不会生成没有**描述**的字段
* 列表页：默认过滤掉了**字段描述**包含`'创建者', '创建时间', '修改者', '修改时间', 'Id'，'附件'`（）
* 详情页：默认过滤掉了**字段描述**包含`'创建者', '创建时间', '修改者', '修改时间', 'Id'`


### 表单页，字段所用组件的生成规则：（根据字段描述是否包含某些文字来确定所使用组件）

* 包含**字典**时：DictSelect
* 包含**是否**时：el-switch
* 包含**日期、时间**时：el-date-picker
* 包含**备注、描述**时：el-input type=textarea
* 包含**附件**时：el-upload
* 其余使用 el-input