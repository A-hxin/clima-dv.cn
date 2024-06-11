//思路：1、根据renderController生成的目录，将每个目录下的getpage文件读取出来，查找<any,和>(`中间的字符串获取到接口返回类型的名称，
//2、将获取到的类型名称，从interface目录下读取出来，然后查找data:和下一个;之间的字符串，用replace方法将空格去掉，获取到data的类型名称
//2.1、继续在getpage文件中查找 `符号和`符号间的数据例如`/api/admin/api/get-page`，用replace去掉/get-page，然后再将/替换成冒号:（用来设置权限）
// 3、将获取到的data的类型名称，从interface目录下读取出来，然后查找list:和下一个;之间的字符串,用replace方法将[]和空格去掉，获取到list的类型名称
// 4、将获取到的list的类型名称，从interface目录下读取出来，查找大括号{}中的数据，将这个字符串放到之前我写好的内容中（待改善），可以生成到table中每一个字段的column

const content = `
<!--
此代码由renderVue工具自动生成
作者：mask
-->

<template>
  <div class="my-layout">
    <el-card class="mt8" shadow="never" :body-style="{ paddingBottom: '0' }">
      <el-form :inline="true" @submit.stop.prevent>
        <div class="search-box">
          <div class="search-simple-box">
            <el-form-item>
              <my-select-input v-model="state.basic" :filters="state.filters" />
            </el-form-item>
            <el-form-item>
              <el-link type="primary" @click.prevent="openAdvancedSearch">高级搜索</el-link>
            </el-form-item>
          </div>
          <div class="func-btn-box">
            <el-form-item>
              <el-checkbox class="mr10" v-model="listView.state.pageInput.isDelete" label="已删除" size="large"
                @change="onSearch" />
              <el-button type="primary" :loading="listView.state.listLoading" size="default" @click="onSearch"> 查询
              </el-button>
              <el-button type="warning" size="default" @click="cleanSearchParams"> 重置
              </el-button>
              <el-button v-auth="'<%= permissionPrefix %>:add'" type="primary" size="default" @click="onAdd"> 新增 </el-button>
              <!-- 判断条件需要放到单独的标签中，否则切换时会导致渲染问题  -->
              <template v-if="!listView.state.pageInput.isDelete">
                <el-button :loading="listView.state.batchSoftDeleteLoading" size="default"
                  v-auth="'<%= permissionPrefix %>:soft-delete'" type="danger" :disabled="!selected.length"
                  @click="onSelectSoftDelete">
                  批量删除
                </el-button>
              </template>
              <template v-if="listView.state.pageInput.isDelete">
                <el-button :loading="listView.state.batchDeleteLoading" size="default" v-auth="'<%= permissionPrefix %>:delete'"
                  type="danger" :disabled="!selected.length" @click="onSelectDelete"> 批量彻底删除
                </el-button>
                <el-button :loading="listView.state.batchRecoveryLoading" size="default" v-auth="'<%= permissionPrefix %>:delete'"
                  type="success" :disabled="!selected.length" @click="onSelectRefresh">
                  批量恢复
                </el-button>
              </template>
              <el-button :loading="listView.state.downloadLoading" size="default" v-auth="'<%= permissionPrefix %>:add'"
                type="success" @click="onDownload">
                下载导入模板 </el-button>
              <!-- bind解决this指向的问题 -->
              <el-upload v-auth="'<%= permissionPrefix %>:add'" class="upload-import" :action="importObject.importUrl"
                :headers="{ 'Authorization': listView.token }"
                :on-success="importObject.onImportSuccess.bind(importObject)"
                :on-error="importObject.onImportError.bind(importObject)"
                :on-progress="importObject.onImportProgress.bind(importObject)" :auto-upload="true"
                :show-file-list="false">
                <el-button :loading="importObject.importLoading" size="default" type="warning" class="ml10">
                  导入模板
                </el-button>
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <el-card class="my-fill mt8" shadow="never">
      <el-table ref="table" :data="listView.state.list" style="width: 100%" v-loading="listView.state.listLoading"
        row-key="id" default-expand-all @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <%- tableColumn %>
        <el-table-column label="操作" width="180" fixed="right" header-align="center" align="center">
          <template #default="{ row, $index }">
            <el-button v-auth="'<%= permissionPrefix %>:update'" size="small" text type="primary" @click.stop="onEdit(row)"
              v-if="!row.isDeleted">编辑</el-button>
            <el-button v-auth="'<%= permissionPrefix %>:soft-delete'" size="small" text type="danger"
              @click.stop="onSoftDelete(row)" v-if="!row.isDeleted">删除</el-button>
            <el-button v-auth="'<%= permissionPrefix %>:get'" size="small" text type="warning" @click.stop="onOpenDetail(row)"
              v-if="!row.isDeleted">查看</el-button>
            <el-button v-auth="'<%= permissionPrefix %>:delete'" size="small" text type="danger" @click.stop="onDelete(row)"
              v-if="row.isDeleted">彻底删除</el-button>
            <el-button v-auth="'<%= permissionPrefix %>:delete'" size="small" text type="success" @click.stop="onRefresh(row)"
              v-if="row.isDeleted">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="my-flex my-flex-end" style="margin-top: 20px">
        <el-pagination v-model:currentPage="listView.state.pageInput.currentPage"
          v-model:page-size="listView.state.pageInput.pageSize" :total="listView.state.total"
          :page-sizes="[10, 20, 50, 100]" small background @size-change="onSizeChange" @current-change="onCurrentChange"
          layout="total, sizes, prev, pager, next, jumper" />
      </div>
    </el-card>
    <!-- 根据新增接口中是否有字典类型生成sexOptions -->
    <FormDialog ref="FormDialogRef" @refresh="onQuery">
    </FormDialog>
    <DetailDialog ref="detailDialogRef" />
    <AdvancedSearch ref="AdvancedSearchRef" v-model="listView.state.isShowAdvancedSearch"
      :modelFilter="state.advancedSearchParams" v-model:model-controlinput="state.controlinput" :filters="state.filters"
      @get-model-controlinput="getAdvancedSearchControlinput" @getData="getAdvancedSearchData">
    </AdvancedSearch>
  </div>
</template>

<script lang="ts" setup name="<%= permissionPrefix.replace(':','-') %>">
import { ref, reactive, onMounted, getCurrentInstance, onBeforeMount, defineAsyncComponent, onActivated, onDeactivated } from 'vue'
import { formatterTime } from '/@/utils/format'
import { DemoListOutput, DictGetListDto } from '/@/api/interface'
import { getDictLabel } from '/@/utils/dictUtils';
import { useDictListInfo } from '/@/stores/dictListInfo';
import { storeToRefs } from 'pinia';
import {
  demoGetPage,
  demoBatchDelete,
  demoDelete,
  demoBatchSoftDelete,
  demoBatchRecovery,
  demoDownloadTemplate,
  demoSoftDelete,
  demoRecovery,
} from '/@/api/controller'
import { useListView } from '/@/hooks/useListView'

const storesUseUserInfo = useDictListInfo()
const { dictListInfo } = storeToRefs(storesUseUserInfo)

// 引入组件
const AdvancedSearch = defineAsyncComponent(() => import('/@/components/AdvancedSearch/index.vue'))

const FormDialog = defineAsyncComponent(() => import('./components/form-dialog.vue'))
const DetailDialog = defineAsyncComponent(() => import('./components/detail-dialog.vue'))
const MySelectInput = defineAsyncComponent(() => import('/@/components/my-select-input/index.vue'))

const { proxy } = getCurrentInstance() as any

const FormDialogRef = ref()

const detailDialogRef = ref()

const listView = useListView()

const state = reactive({
  //基础搜索
  basic: {} as DynamicFilterInfo,
  //AdvancedSearch组件中的ControlScreenInput组件 作用：回显
  controlinput: [] as Array<DynamicFilterInfo>,
  //高级搜索参数
  advancedSearchParams: {},
  //高级搜索
  filters: [
    <% filters.forEach(function(itemKey,itemIndex) { %>{
        field: '<%= itemKey.field %>',
        operator: '<%= itemKey.operator %>',
        description: '<%= itemKey.description %>',
        componentName: '<%= itemKey.componentName %>',
        defaultSelect: <%= !itemIndex %>,
      },<% }) %>
  ] as Array<DynamicFilterInfo>,
})

//处理获取列表的请求参数
function initListParams() {
  //state.controlinput 为 ControlScreenInput组件过滤的参数
  //state.filter 为 其余筛选组件过滤的参数
  let params = [state.basic, ...Object.values(state.advancedSearchParams)]
  console.log(state.advancedSearchParams);

  let filters = params.map((item: any) => {
    if ((typeof item.value === 'object' && item.value.length) || (typeof item.value == 'string' && item.value) || typeof item.value == 'number' || typeof item.value == 'boolean') {
      return item
    } else {
      return {}
    }
  }).filter(obj => Object.keys(obj).length !== 0)

  listView.state.pageInput.dynamicFilter = {
    ...listView.state.pageInput.dynamicFilter,
    //用来筛选表中没有储存的数据
    filters: filters
  }
}

function onQuery() {
  //注意这里的demoGetPage的规则是 （接口的http请求方式 + 接口的完整路径） （驼峰命名，首字母小写）
  initListParams()
  listView.onQuery(demoGetPage)
}

//搜索
function onSearch() {
  listView.initPageInput()
  onQuery()
}

const selected: any = ref([])

//表格多选
const handleSelectionChange = (selection: any) => {
  selected.value = selection
}

//将选中的多选内容，装换成只含id的数组
function initSelectParams(): number[] | [] {
  return selected.value.map((item: any) => {
    return item.id
  })
}

//批量删除
function onSelectSoftDelete() {
  listView.onMultipleSoftDelete(demoBatchSoftDelete, initSelectParams(), onSearch)
}

//批量彻底删除
function onSelectDelete() {
  listView.onMultipleDelete(demoBatchDelete, initSelectParams(), onSearch)
}

//批量恢复
function onSelectRefresh() {
  listView.onMultipleRecovery(demoBatchRecovery, initSelectParams(), onSearch)
}

//恢复 注意修改row.name
const onRefresh = async (row: DemoListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要恢复当前数据?\`)
    .then(async () => {
      if (row.id) {
        await demoRecovery({ id: row.id })
        onQuery()
      } else {
        proxy.$modal.msgError('id为空')
      }
    })
    .catch(() => { })
}

//下载模板
function onDownload() {
  listView.onDownload(demoDownloadTemplate)
}

//软删除 注意修改row.name 
const onSoftDelete = (row: DemoListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要删除当前数据?\`)
    .then(async () => {
      try {
        if (row.id == undefined) return proxy.$modal.msgError('id不能为空')
        let res = await demoSoftDelete({ id: row.id })
        if (res.success) {
          onQuery()
          proxy.$modal.msgSuccess('删除成功')
        } else {
          proxy.$modal.msgError(res.msg)
        }
      } catch (error) {
      }
    })
}

//彻底删除 注意修改row.name
const onDelete = (row: DemoListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要删除当前数据?\`)
    .then(async () => {
      if (row.id) {
        try {
          let res = await demoDelete({ id: row.id })
          if (res.success) {
            onQuery()
            proxy.$modal.msgSuccess('删除成功')
          } else {
            proxy.$modal.msgError(res.msg)
          }
        } catch (error) {
          proxy.$modal.msgError(error)
        }
      } else {
        proxy.$modal.msgError('id为空')
      }
    })
}

const importObject = new listView.ImportFile(onSearch, '/api/demo/demo/import')

const onAdd = () => {
  console.log(FormDialogRef.value);
  FormDialogRef.value.open()
}

const onEdit = (row: any) => {
  FormDialogRef.value.open(row)
}

// 打开详情
const onOpenDetail = (row: any) => {
  detailDialogRef.value.open(row)
}

const onSizeChange = (val: number) => {
  listView.state.pageInput.pageSize = val
  onQuery()
}

const onCurrentChange = (val: number) => {
  listView.state.pageInput.currentPage = val
  onQuery()
}


/**
 * 打开高级搜索
 */
function openAdvancedSearch() {
  listView.state.isShowAdvancedSearch = true
}

/**
 * 重置搜索
 */
const AdvancedSearchRef = ref()
function cleanSearchParams() {
  state.basic.value = ''
  AdvancedSearchRef.value.exportReset()
}

/**
 * 获取高级搜索中的数据
 */
function getAdvancedSearchData(pararm: any) {
  state.advancedSearchParams = JSON.parse(JSON.stringify(pararm)) // 深拷贝，防止修改state中的数据
}

function getAdvancedSearchControlinput(controlinput: DynamicFilterInfo[]) {
  state.controlinput = JSON.parse(JSON.stringify(controlinput)) // 深拷贝，防止修改state中的数据
}
onActivated(() => {
  // listView.onQuery(demoGetPage(state.pageInput))
  // !!!!!!!!!!!注意这里EmplateTest需要根据列表名称进行改动，不然有可能会出问题
  // 表单组件中的EmplateTest也需要更改
  // （页面缓存时使用）
  // eventBus.off('refreshEmplateTest')
  // eventBus.on('refreshEmplateTest', () => {
  //   onQuery()
  // })
})

onDeactivated(() => {
  //这里销毁 （页面缓存时使用）
  // eventBus.off('refreshEmplateTest')
})


/**
 * 下一步封装计划
 * 
 * 1. 列表中操作栏的按钮需要封装成一个按钮组件，才能拥有自己单独的loading
 * 2. 封装表单新增/修改方法
 * 
 * **/

onMounted(() => {
  onQuery()
})



</script>

<style scoped lang="scss"></style>
`;
let ejs = require('ejs');
const fs = require('fs');
const path = require('path');
let { renderFile } = require('../utils/index');
const options = {
	printWidth: 999,
	tabWidth: 2,
	proseWrap: 'never',
	trailingComma: 'none',
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	vueIndentScriptAndStyle: false,
	parser: 'vue',
};

// 获取renderController生成的目录
const directoryPath = path.join(__dirname, '../../src/api/controller');

// 读取每个目录下的getpage文件
fs.readdir(directoryPath, (err, files) => {
	if (err) {
		console.log('Unable to scan directory: ' + err);
	} else {
		// 遍历每个目录
		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);
			let arr = [];
			let dirName = '';
			//获取目录名称
			fs.stat(filePath, (err, stats) => {
				if (err) return;
				if (stats.isDirectory()) {
					arr = filePath.split('\\');
					dirName = arr[arr.length - 1];
					// 读取目录下getpage文件内容
					let getPageFilePath = filePath + '\\' + dirName + 'GetPage.ts';
					fs.readFile(getPageFilePath, 'utf8', (err, data) => {
						if (err) {
							console.log('Unable to read file: ' + err);
						} else {
							// 查找<any,和>中间的字符串获取接口返回类型
							const regex = /<any, (.*?)>/;
							const returnTypeArr = regex.exec(data);
							if (!returnTypeArr) return;
							const returnType = returnTypeArr[1].replace(' ', '');

							const interfaceUrlRegex = /`([^}]+)`/;
							const interfaceUrlArr = interfaceUrlRegex.exec(data);
							if (!interfaceUrlArr) return;
							//权限前缀
							const permissionPrefix = interfaceUrlArr[1].replace('/get-page', '').replaceAll('/', ':').slice(1);

							// 从interface目录下读取接口返回类型的文件
							const interfaceFilePath = path.join(__dirname, '../../src/api/interface/apiTypes', returnType + '.ts');

							// 读取接口文件内容
							fs.readFile(interfaceFilePath, 'utf8', (err, interfaceData) => {
								if (err) {
									console.log('Unable to read interface file: ' + err);
								} else {
									// 查找data:和;之间的字符串获取data类型
									const dataRegExp = /data:\s(.*?);/;
									const dataNameArr = dataRegExp.exec(interfaceData);
									if (!dataNameArr) return;
									const dataName = dataNameArr[1].replace(/\s/g, '');

									// 从interface目录下读取data的文件
									const dataFilePath = path.join(__dirname, '../../src/api/interface/apiTypes', dataName + '.ts');

									// 读取data文件内容
									fs.readFile(dataFilePath, 'utf8', (err, dataInterfaceData) => {
										if (err) {
											console.log('Unable to read data interface file: ' + err);
										} else {
											// 查找list:和;之间的字符串获取list类型
											const listRegExp = /list:\s(.*?);/;
											const listTypeArr = listRegExp.exec(dataInterfaceData);
											if (!listTypeArr) return;
											const listType = listTypeArr[1].replace(/\s/g, '').replace('[]', '');

											// 从interface目录下读取list的文件
											const listFilePath = path.join(__dirname, '../../src/api/interface/apiTypes', listType + '.ts');
											// 读取list文件内容
											fs.readFile(listFilePath, 'utf8', (err, listInterfaceData) => {
												if (err) {
													console.log('Unable to read list interface file: ' + err);
												} else {
													// 查找大括号{}中的内容
													const fieldsRegExp = /{([^}]+)}/;
													const fieldsArr = fieldsRegExp.exec(listInterfaceData);
													if (!fieldsArr) return;
													const fields = fieldsArr[1];
													// console.log(fields);
													// 生成table中每一个字段的column
													// 待实现

													let tableStr = renderTable(fields, permissionPrefix);

													renderFile('../../src/views/renderVue/' + dirName + '/index.vue', tableStr, options);
												}
											});
										}
									});
								}
							});
						}
					});
				} else {
					return;
				}
			});
		});
	}
});

/**
 * 生成表格的列
 * @param {*} barr { label: string, prop: string, type: string }[]
 */
function renderElTableColumn(barr) {
	/**
	 * 生成的el-table-column数据
	 */
	let tableColumn = '';
	// 遍历过滤后的数组
	for (let i = 0; i < barr.length; i++) {
		// 如果对象标签中包含字典
		if (barr[i].label.indexOf('字典') != -1) {
			// 调用renderDictColumn函数，生成el-table-column数据
			tableColumn += renderDictColumn(barr[i]);
			// 如果对象标签中包含是否
		} else if (barr[i].label.indexOf('是否') != -1) {
			// 调用renderBooleanColumn函数，生成el-table-column数据
			tableColumn += renderBooleanColumn(barr[i]);
			// 如果对象标签中包含日期
		} else if (barr[i].label.indexOf('日期') != -1) {
			// 调用renderDateColumn函数，生成el-table-column数据
			tableColumn += renderDateColumn(barr[i]);
			// 如果对象标签中不包含字典、是否、日期
		} else {
			// 调用renderDateColumn函数，生成el-table-column数据
			tableColumn += `${`<el-table-column label="${barr[i].label}" prop="${barr[i].prop}" show-overflow-tooltip />\n`}`;
		}
	}

	return tableColumn;
}

/**
 * 生成表格的高级搜索参数
 * @param {*} barr { label: string, prop: string, type: string }[]
 */
function renderFilters(barr) {
	let filters = [];
	for (let i = 0; i < barr.length; i++) {
		// 如果对象标签中包含字典
		if (barr[i].type == 'string') {
			filters.push({
				field: barr[i].prop,
				operator: 'Contains',
				description: barr[i].label,
				componentName: 'el-input',
				defaultSelect: !i,
			});
		}
	}
	return filters;
}

function renderTable(fields, permissionPrefix) {
	/**
	 * 生成的el-table-column数据
	 */
	let tableColumn = '';
	let filters = [];
	// 过滤掉不需要生成的字段
	let filter = ['创建者', '创建时间', '修改者', '修改时间', 'Id', '附件'];
	// 注释和字段的字符串数组
	let arr = findStringsBeforeNewLines(fields.replace(/\t/g, ''));
	// 声明一个空数组
	let objArr = [];
	// label：注释；prop：属性名；type：类型
	let obj = { label: '', prop: '', type: '' };
	// 声明一个布尔值
	let isFlag = true;
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		// 如果数组中的元素不为空，且布尔值为true
		if (!!arr[i] && isFlag) {
			// 获取属性标签
			let label = getPropertyLabel(arr[i]);
			// 如果标签不为空
			if (!!label) {
				// 将标签赋值给对象
				obj.label = label;
				// 获取属性prop和type
				let b = getPropertyProp(arr[i + 1]);
				// 将prop赋值给对象
				obj.prop = b[0];
				// 将type赋值给对象
				obj.type = b[1];
				// 将对象添加到数组中
				objArr.push(obj);
				// 将布尔值设置为false
				obj = { label: '', prop: '', type: '' };
				// 将布尔值设置为true
				isFlag = false;
			}
			// 如果数组中的元素不为空，且布尔值为false
		} else {
			// 将布尔值设置为true
			isFlag = true;
			// 跳出本次循环
			continue;
		}
	}

	// 过滤数组
	let barr = objArr.filter((item) => {
		// 声明一个布尔值
		let isFlag = true;
		// 遍历过滤字段
		filter.map((filterItem) => {
			// 如果过滤字段在对象标签中，则将布尔值设置为false
			if (item.label.indexOf(filterItem) !== -1) {
				return (isFlag = false);
			}
		});
		// 如果布尔值为false，则返回false
		if (!isFlag) {
			return false;
			// 如果布尔值为true，则返回true
		} else {
			return true;
		}
	});

	tableColumn = renderElTableColumn(barr);
	filters = renderFilters(barr);
	console.log(permissionPrefix);
	let templateStr = ejs.render(content, { barr, permissionPrefix, tableColumn, filters: filters });

	return templateStr;
}

/* 功能：查找字符串之前的新行
 * 参数：str：字符串
 * 返回：匹配的子字符串数组
 */
function findStringsBeforeNewLines(str) {
	// 使用正则表达式匹配换行符之前的字符串
	let matches = str.match(/[^\n]+/g);
	// 返回匹配的子字符串数组
	return matches;
}

//生成字典行
function renderDictColumn(item) {
	return `${`<el-table-column prop="${item.prop}" label="${item.label}" min-width="120" show-overflow-tooltip>
<template #default="{ row }">
{{ getDictLabel(dictListInfo.${item.prop},
row.${item.prop}) }}
</template>
</el-table-column>`}\n`;
}

//生成 是否 字段的行
function renderBooleanColumn(item) {
	return `${`<el-table-column label="${item.label}" prop="${item.prop}" >
<template #default="{ row }">
{{ row.${item.prop} ? '是' : '否' }}
</template>
</el-table-column>`}\n`;
}

//生成 日期 字段的行
function renderDateColumn(item) {
	return `${`<el-table-column prop="${item.prop}" label="${item.label}" :formatter="formatterTime" min-width="120" />\n`}`;
}

function getPropertyProp(property) {
	let str = property.replace(/;/g, '').replace(/\?/g, '').replace(/\s/g, '');
	// 根据:分割字符串为数组
	let arr = str.split(/:|\?/);

	return arr;
}

// 功能：根据传入的comment参数，获取对应的属性标签
// 正则表达式：/\/\*\* (.+?) \*\//
// 返回值：match[1]
function getPropertyLabel(comment) {
	// 定义正则表达式，用于匹配comment中的属性标签
	let regex = /\/\*\* (.+?) \*\//;
	// 使用正则表达式匹配comment中的属性标签
	let match = comment.match(regex);
	// 返回匹配到的属性标签，如果没有匹配到，则返回空字符串
	return match ? match[1] : '';
}
