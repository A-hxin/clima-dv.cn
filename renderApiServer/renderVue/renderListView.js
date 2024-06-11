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

<script lang="ts" setup name="<%= permissionPrefix.replaceAll(':','-') %>">
import { ref, reactive, onMounted, getCurrentInstance, onBeforeMount, defineAsyncComponent, onActivated, onDeactivated } from 'vue'
import { formatterTime } from '/@/utils/format'
import { <%= dirName %>ListOutput } from '/@/api/interface'
import { getDictLabel } from '/@/utils/dictUtils';
import { useDictListInfo } from '/@/stores/dictListInfo';
import { storeToRefs } from 'pinia';
import {
  <%=  lowerCasedirName %>GetPage,
  <%=  lowerCasedirName %>BatchDelete,
  <%=  lowerCasedirName %>Delete,
  <%=  lowerCasedirName %>BatchSoftDelete,
  <%=  lowerCasedirName %>BatchRecovery,
  <%=  lowerCasedirName %>DownloadTemplate,
  <%=  lowerCasedirName %>SoftDelete,
  <%=  lowerCasedirName %>Recovery,
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
  //注意这里的<%=  lowerCasedirName %>GetPage的规则是 （接口的http请求方式 + 接口的完整路径） （驼峰命名，首字母小写）
  initListParams()
  listView.onQuery(<%=  lowerCasedirName %>GetPage)
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
  listView.onMultipleSoftDelete(<%=  lowerCasedirName %>BatchSoftDelete, initSelectParams(), onSearch)
}

//批量彻底删除
function onSelectDelete() {
  listView.onMultipleDelete(<%=  lowerCasedirName %>BatchDelete, initSelectParams(), onSearch)
}

//批量恢复
function onSelectRefresh() {
  listView.onMultipleRecovery(<%=  lowerCasedirName %>BatchRecovery, initSelectParams(), onSearch)
}

//恢复 注意修改row.name
const onRefresh = async (row: <%= dirName %>ListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要恢复当前数据?\`)
    .then(async () => {
      if (row.id) {
        await <%=  lowerCasedirName %>Recovery({ id: row.id })
        onQuery()
      } else {
        proxy.$modal.msgError('id为空')
      }
    })
    .catch(() => { })
}

//下载模板
function onDownload() {
  listView.onDownload(<%=  lowerCasedirName %>DownloadTemplate)
}

//软删除 注意修改row.name 
const onSoftDelete = (row: <%= dirName %>ListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要删除当前数据?\`)
    .then(async () => {
      try {
        if (row.id == undefined) return proxy.$modal.msgError('id不能为空')
        let res = await <%=  lowerCasedirName %>SoftDelete({ id: row.id })
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
const onDelete = (row: <%= dirName %>ListOutput) => {
  proxy.$modal
    .confirmDelete(\`确定要删除当前数据?\`)
    .then(async () => {
      if (row.id) {
        try {
          let res = await <%=  lowerCasedirName %>Delete({ id: row.id })
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
  // listView.onQuery(<%=  lowerCasedirName %>GetPage(state.pageInput))
  // !!!!!!!!!!!注意这里<%= dirName %>需要根据列表名称进行改动，不然有可能会出问题
  // 表单组件中的<%= dirName %>也需要更改
  // （页面缓存时使用）
  // eventBus.off('refresh<%= dirName %>')
  // eventBus.on('refresh<%= dirName %>', () => {
  //   onQuery()
  // })
})

onDeactivated(() => {
  //这里销毁 （页面缓存时使用）
  // eventBus.off('refresh<%= dirName %>')
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

/**
 *	生成表格列表页
 * @param {array} arr
 * @param {string} dirName 文件夹名称
 * @param {string} permissionPrefix 权限前缀
 * @returns
 */
function renderTable(arr, dirName, permissionPrefix) {
	/**
	 * 生成的el-table-column数据
	 */
	let tableColumn = '';
	let filters = [];
	// 过滤掉不需要生成的字段
	let filter = ['附件'];

	// 过滤数组
	let barr = arr.filter((item) => {
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
	let lowerCasedirName = dirName.charAt(0).toLowerCase() + dirName.slice(1);
	let templateStr = ejs.render(content, { barr, permissionPrefix, tableColumn, filters: filters, dirName, lowerCasedirName });

	return templateStr;
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

module.exports = {
	renderTable,
};
