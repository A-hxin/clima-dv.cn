//思路：1、根据renderController生成的目录，将每个目录下的getpage文件读取出来，查找<any,和>(`中间的字符串获取到接口返回类型的名称，
//2、将获取到的类型名称，从interface目录下读取出来，然后查找data:和下一个;之间的字符串，用replace方法将空格去掉，获取到data的类型名称
//2.1、继续在getpage文件中查找 `符号和`符号间的数据例如`/api/admin/api/get-page`，用replace去掉/get-page，然后再将/替换成冒号:（用来设置权限）
// 3、将获取到的data的类型名称，从interface目录下读取出来，然后查找list:和下一个;之间的字符串,用replace方法将[]和空格去掉，获取到list的类型名称
// 4、将获取到的list的类型名称，从interface目录下读取出来，查找大括号{}中的数据，将这个字符串放到之前我写好的内容中（待改善），可以生成到table中每一个字段的column

const fs = require('fs');
const path = require('path');
let { renderFile } = require('../utils/index');
let { renderTable } = require('./renderListView');
let { renderDetail } = require('./renderDetailView');
let { renderForm } = require('./renderFormView');
let { BASE_FILE_VIEWS_PATH } = require('../utils/constant');

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

function renderVue(obj) {
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

														renderMain(obj, fields, dirName, permissionPrefix);
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
}

/**
 * 主生成方法，将数据格式化，然后通过参数传递给其他页面的生成方法
 * @param {object} objInfo swagger信息
 * @param {string} fields 字段信息
 * @param {string} dirName 文件夹名称
 * @param {string} permissionPrefix 权限控制的前缀，例如api:demo:demo
 */
function renderMain(objInfo, fields, dirName, permissionPrefix) {
	// 过滤掉不需要生成的字段
	let filter = ['创建者', '创建时间', '修改者', '修改时间', 'Id'];

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

	// 过滤掉不需要生成的字段
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

	let tableStr = renderTable(barr, dirName, permissionPrefix);
	renderFile(BASE_FILE_VIEWS_PATH + '/renderVue/' + dirName + '/index.vue', tableStr, options);

	let detailStr = renderDetail(barr, dirName, permissionPrefix);
	renderFile(BASE_FILE_VIEWS_PATH + '/renderVue/' + dirName + '/components/detail-dalog.vue', detailStr, options);

	let formStr = renderForm(objInfo, dirName, permissionPrefix);

	renderFile(BASE_FILE_VIEWS_PATH + '/renderVue/' + dirName + '/components/form-dalog.vue', formStr, options);
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

module.exports = {
	renderVue,
};
