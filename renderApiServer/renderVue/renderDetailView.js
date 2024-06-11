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
  <div class="detail-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
      <el-descriptions title="" v-loading="state.loading" :column="3" direction="vertical" border>
        <%- column %>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="default">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="<%= permissionPrefix.replaceAll(':','-') %>-detail">
import { getCurrentInstance, reactive, defineProps } from 'vue'
import dayjs from 'dayjs'
import { <%=  lowerCasedirName %>Get } from '/@/api/controller'
import { <%= dirName %>GetOutput,  DictGetListDto } from '/@/api/interface'
import { useDictListInfo } from '/@/stores/dictListInfo'
import { getDictLabel } from '/@/utils/dictUtils'
import { storeToRefs } from 'pinia'


//获取字典
const storesUseUserInfo = useDictListInfo()

const { dictListInfo } = storeToRefs(storesUseUserInfo)

// 定义变量内容
const state = reactive({
  dialog: {
    isShowDialog: false,
    //根据列表名称生成
    title: '详情',
  },
  data: {} as <%= dirName %>GetOutput,
  loading: false,
})

const formatterTime = (cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

// 关闭弹窗
const resetData = () => {
  state.data = {} as <%= dirName %>GetOutput
}

const { proxy } = getCurrentInstance() as any

// 打开弹窗
const open = async (row: any) => {
  try {
    state.dialog.isShowDialog = true
    resetData()
    const res = await <%=  lowerCasedirName %>Get({ id: row.id })

    if (res?.success) {
      state.data = res.data
    }
  } catch (error) {
    proxy.$modal.msgError(error)
  }

}
// 关闭弹窗
const closeDialog = () => {
  state.dialog.isShowDialog = false
}
// 取消
const onCancel = () => {
  closeDialog()
}

// 暴露变量
defineExpose({
  open,
})
</script>
`;
let ejs = require('ejs');

/**
 * 生成el-descriptions-item数据
 * @param {*} barr { label: string, prop: string, type: string }[]
 */
function renderColumn(barr) {
	/**
	 * 生成的el-descriptions-item数据
	 */
	let column = '';
	// 遍历过滤后的数组
	for (let i = 0; i < barr.length; i++) {
		// 如果对象标签中包含字典
		if (barr[i].label.indexOf('字典') != -1) {
			// 调用renderDictColumn函数，生成el-descriptions-item数据
			column += renderDictColumn(barr[i]);
			// 如果对象标签中包含是否
		} else if (barr[i].label.indexOf('是否') != -1) {
			// 调用renderBooleanColumn函数，生成el-descriptions-item数据
			column += renderBooleanColumn(barr[i]);
			// 如果对象标签中包含日期
		} else if (barr[i].label.indexOf('日期') != -1) {
			// 调用renderDateColumn函数，生成el-descriptions-item数据
			column += renderDateColumn(barr[i]);
			// 如果对象标签中不包含字典、是否、日期
		} else {
			// 调用renderDateColumn函数，生成el-descriptions-item数据
			column += `${`<el-descriptions-item label="${barr[i].label}">{{ state.data.${barr[i].prop} || '--' }}</el-descriptions-item>\n`}`;
		}
	}

	return column;
}

/**
 *	生成详情页
 * @param {array} arr
 * @param {string} dirName 文件夹名称
 * @param {string} permissionPrefix 权限前缀
 */
function renderDetail(arr, dirName, permissionPrefix) {
	/**
	 * 生成的el-descriptions-item数据
	 */
	let column = '';
	// 过滤掉不需要生成的字段
	// let filter = ['附件'];
	let filter = [];

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

	column = renderColumn(barr);

	let lowerCasedirName = dirName.charAt(0).toLowerCase() + dirName.slice(1);
	let templateStr = ejs.render(content, { barr, permissionPrefix, column, dirName, lowerCasedirName });

	return templateStr;
}

//生成字典行
function renderDictColumn(item) {
	return `${`<el-descriptions-item label="${item.label}">{{ getDictLabel(dictListInfo.${item.prop},state.data.${item.prop})}}</el-descriptions-item>`}\n`;
}

//生成 是否 字段的行
function renderBooleanColumn(item) {
	return `${`<el-descriptions-item label="${item.label}">{{ state.data.${item.prop} ? '是' : '否' || '--' }}</el-descriptions-item>`}\n`;
}

//生成 日期 字段的行
function renderDateColumn(item) {
	return `${`<el-descriptions-item label="${item.label}">{{ formatterTime(state.data.${item.prop}) }}</el-descriptions-item>\n`}`;
}

module.exports = {
	renderDetail,
};
