const content = `
<!--
此代码由renderVue工具自动生成
作者：mask
-->
<template>
  <div class="demo-demo-form-dialog-container">
    <el-dialog v-model="state.showDialog" destroy-on-close :title="state.title" draggable :close-on-click-modal="false"
      :close-on-press-escape="false" width="70%" @close="resetForm">
      <el-form :model="state.form" ref="formRef" size="default" label-width="150px">
        <el-row :gutter="35">
          <%- column %>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click.stop="onCancel" size="default">取 消</el-button>
          <el-button type="primary" @click.stop="onSure" size="default" :loading="state.sureLoading">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, getCurrentInstance, defineAsyncComponent, defineProps, watch, computed } from 'vue'
import {  <%= dirName %>UpdateInput } from '/@/api/interface'
import {
  <%= lowerCasedirName %>Get,
  <%= lowerCasedirName %>Add,
  <%= lowerCasedirName %>Update,
} from "/@/api/controller";
import { useDictListInfo } from '/@/stores/dictListInfo'
import { storeToRefs } from 'pinia'
import pinia from '/@/stores/index'
import { useUserInfo } from '/@/stores/userInfo';
const storesUserInfo = useUserInfo(pinia)

const { proxy } = getCurrentInstance() as any
const DictSelect = defineAsyncComponent(() => import('/@/components/DictSelect/index.vue'))
const CommonInterfaceSelect = defineAsyncComponent(() => import('/@/components/CommonInterfaceSelect/index.vue'))

const storesUseUserInfo = useDictListInfo()

const { dictListInfo } = storeToRefs(storesUseUserInfo)

const formRef = ref()
const state = reactive({
	title: '新增',
  showDialog: false,
  sureLoading: false,
  form: {}  as <%= dirName %>UpdateInput,
  upload:{
		  <%=  uploadVar %>
	}
})

const emit = defineEmits(["refresh"])
function resetForm() {
  state.form = {}  as <%= dirName %>UpdateInput
  <%=  uploadVarReset %>
}


// 打开对话框
const open = async (row: any) => {
  if (row && row.id) {
    try {
			state.title = '修改'
      const res = await <%= lowerCasedirName %>Get({ id: row.id })
      if (res?.success) {
        state.form = res.data 
        <%= uploadEcho %>
      }

    } catch (error) {
      proxy.$modal.closeLoading()

    }
  }
  state.showDialog = true
}

// 取消
const onCancel = () => {
  resetForm()
  state.showDialog = false
}

// 确定
const onSure = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    state.sureLoading = true
    let res = {} as any
    if (state.form.id) {
      try {
        res = await <%= lowerCasedirName %>Update(state.form)
        if (res.success) {
          proxy.$modal.msgSuccess('修改成功')
          resetForm()
        }
      } catch (error) {
      } finally {
        state.sureLoading = false
      }
    } else {
      try {
        res = await <%= lowerCasedirName %>Add(state.form)
        if (res.success) {
          proxy.$modal.msgSuccess('新增成功')
          resetForm()
        }
      } catch (error) {
      } finally {
        state.sureLoading = false
      }
    }

    if (res?.success) {
      emit('refresh')
      state.showDialog = false
    }
  })
}


defineExpose({
  open,
})
</script>
`;
let ejs = require('ejs');
let { toCapitalizeFirstLetter } = require('../utils/index.js');
/**
 * 上传接口的后缀 例如：/api/business-manage/contract/upload-attachment 后缀为upload-attachment
 */
const uploadSuffix = 'upload-attachment';

/**
 * 生成el-form-item数据
 * @param {*} barr { label: string, prop: string ,type: string}[]
 */
function renderColumn(barr, permissionPrefix, requiredArr) {
	/**
	 * 生成的el-form-item数据
	 */
	let column = '';
	/**
	 * 保存附件上传所用到的函数部分代码
	 */
	let uploadFuncStr = '';
	/**
	 * 保存附件上传所用到的变量部分代码
	 */
	let uploadVar = '';
	/**
	 * 保存附件上传所用到的变量重置部分代码
	 */
	let uploadVarReset = '';
	/**
	 * 保存附件上传所用到的变量回显部分代码
	 */
	let uploadEcho = '';
	// 遍历过滤后的数组
	for (let i = 0; i < barr.length; i++) {
		let item = barr[i];
		let label = item.label ? item.label : '';
		// 如果对象标签中包含字典
		if (label.indexOf('字典') != -1) {
			column += renderDictColumn(item, requiredArr);
			// 如果对象标签中包含是否
		} else if (label.indexOf('是否') != -1) {
			column += renderBooleanColumn(item, requiredArr);
		} else if (label.indexOf('日期') != -1 || label.indexOf('时间') != -1) {
			column += renderDateColumn(item, requiredArr);
		} else if (label.indexOf('备注') != -1 || label.indexOf('描述') != -1) {
			column += renderTextAreaColumn(item, requiredArr);
		} else if (label.indexOf('附件') != -1) {
			let { formItem, formFuncStr } = renderUploadColumn(item, requiredArr);
			column += formItem;
			if (!uploadFuncStr) {
				uploadFuncStr += `//上传
				const fileAction = computed(() => {
					return import.meta.env.VITE_API_URL + '/${permissionPrefix.replaceAll(':', '/')}/upload-attachment'
				})
				const fileHeaders = computed(() => {
					return { Authorization: 'Bearer ' + storesUserInfo.getToken() }
				})\n`;
			}
			uploadFuncStr += `${formFuncStr}\n`;
			uploadVar += `${item.prop}: [],\n`;
			uploadVarReset += `state.upload.${item.prop}= [];\n`;
			uploadEcho += `if (state.form.${item.prop}) state.upload.${item.prop} = state.form.${item.prop}\n`;
		} else {
			// 调用renderDateColumn函数，生成el-descriptions-item数据
			column += renderInputColumn(item, requiredArr);
		}
	}

	return { column, uploadVar, uploadVarReset, uploadFuncStr, uploadEcho };
}

/**
 *	生成表单页
 * @param {object} obj swagger信息
 * @param {string} dirName 文件夹名称
 * @param {string} permissionPrefix 权限前缀
 */
function renderForm(obj, dirName, permissionPrefix) {
	// 过滤掉不需要生成的字段
	// let filter = ['附件'];
	let filter = [];
	let schemas = obj.components.schemas[dirName + 'AddInput'];
	let properties = schemas.properties;
	let requiredArr = schemas.required;
	let arr = [];

	for (let key in properties) {
		arr.push({ label: properties[key].description, prop: key, type: properties[key].type });
	}

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

	let { column, uploadVar, uploadVarReset, uploadFuncStr, uploadEcho } = renderColumn(barr, permissionPrefix, requiredArr ? requiredArr : []);

	let lowerCasedirName = dirName.charAt(0).toLowerCase() + dirName.slice(1);
	let templateStr = ejs.render(content, {
		permissionPrefix,
		column,
		dirName,
		lowerCasedirName,
		uploadVar,
		uploadVarReset,
		uploadFuncStr,
		uploadEcho,
	});

	return templateStr;
}

//生成字典行
function renderDictColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请选择${item.label}', trigger: ['blur', 'change'] }]"`;
		}
	}
	return `${`<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
	<el-form-item label="${item.label}" prop="${item.prop}" ${str}>
		<DictSelect v-model="state.form.${item.prop}" placeholder="请选择${item.label}"
			:options="dictListInfo.${item.prop}" clearable />
	</el-form-item>
</el-col>`}\n`;
}

//生成 是否 字段的行
function renderBooleanColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请选择${item.label}', trigger: ['blur', 'change'] }]"`;
		}
	}

	return `${`<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
	<el-form-item label="${item.label}" prop="${item.prop}" ${str}>
		<el-switch v-model="state.form.${item.prop}"  />
	</el-form-item>
</el-col>`}\n`;
}

//生成 日期 字段的行
function renderDateColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请选择${item.label}', trigger: ['blur', 'change'] }]"`;
		}
	}

	return `${`<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
	<el-form-item label="${item.label}" prop="${item.prop}" ${str}>
		<el-date-picker v-model="state.form.${item.prop}" format="YYYY/MM/DD" value-format="YYYY-MM-DD" type="date"
			placeholder="请选择${item.label}" style="width: 100%" />
	</el-form-item>
</el-col>\n`}`;
}

/**
 * 生成input输入框
 */
function renderInputColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请输入${item.label}', trigger: ['blur', 'change'] }]"`;
		}
	}

	return `${`<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
	<el-form-item label="${item.label}" prop="${item.prop}" ${str}>
	<el-input v-model="state.form.${item.prop}" placeholder="请输入${item.label}" clearable />
	</el-form-item>
</el-col>\n`}`;
}

/**
 * 生成多行文本输入框
 */
function renderTextAreaColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请输入${item.label}', trigger: ['blur', 'change'] }]"`;
		}
	}

	return `${`<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
	<el-form-item label="${item.label}" prop="${item.prop}" ${str}>
	<el-input v-model="state.form.${item.prop}" placeholder="请输入${item.label}" type="textarea" :rows="5" clearable />
	</el-form-item>
</el-col>\n`}`;
}
/**
 *
 * @param {*} item
 * @param {*} requiredArr 必填项prop列表
 * @returns {*} formItem:表单部分， formFuncStr: 函数部分
 */
function renderUploadColumn(item, requiredArr) {
	let str = '';

	for (let item of requiredArr) {
		if (item.includes(item.prop)) {
			str = `:rules="[{ required: true, message: '请选择${item.label}', trigger: ['change'] }]"`;
		}
	}

	return {
		formItem: `${`<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<el-form-item label="上传附件" prop="${item.prop}" ${str}>
			<el-upload ref="upload" v-model:file-list="state.upload.${item.prop}" class="w100" :on-change="handleChange${toCapitalizeFirstLetter(item.prop)}"
				:action="fileAction" multiple :headers="fileHeaders" :before-upload="() => {
					import${toCapitalizeFirstLetter(item.prop)}Loading = true
				}" :on-success="onImportSuccess${toCapitalizeFirstLetter(item.prop)}" :on-error="onFileError${toCapitalizeFirstLetter(item.prop)}">
				<el-button type="primary" :loading="import${toCapitalizeFirstLetter(item.prop)}Loading">选择文件</el-button>
			</el-upload>
		</el-form-item>
	</el-col>\n`}`,
		formFuncStr: `${`
		const import${toCapitalizeFirstLetter(item.prop)}Loading = ref(false)
		//上传成功
	const onImportSuccess${toCapitalizeFirstLetter(item.prop)} = (res: {
		data: never; success: any; msg: any
	}) => {
		import${toCapitalizeFirstLetter(item.prop)}Loading.value = false
	
	}
	//上传失败
	const onFileError${toCapitalizeFirstLetter(item.prop)} = (error: any) => {
		import${toCapitalizeFirstLetter(item.prop)}Loading.value = false
		let message = ''
		if (error.message) {
			try {
				message = JSON.parse(error.message)?.msg
			} catch (err) {
				message = error.message || ''
			}
		}
		if (message) proxy.$modal.msgError(message)
	}
	
	const handleChange${toCapitalizeFirstLetter(item.prop)} = (uploadFile: any, uploadFiles: any) => {
		if (uploadFiles) {
			let arr: any = []
			uploadFiles.forEach((item: any, index: number) => {
				if (item.url && item.status == 'success') {
					arr.push(item)
				} else if (item.status == 'success' && item.response && item.response.success) {
					arr.push(item.response.data)
				} else if (item.status == 'success' && item.response && !item.response.success) {
					proxy.$modal.msgError(item.response.msg)
					state.upload.${item.prop}.pop()
				}
			})
		
			state.form.files = arr
		}
	}\n`}`,
	};
}

module.exports = {
	renderForm,
};
