let { snakeToCamel, renderFile, toLowerCaseFirstLetter } = require('./utils/index');
let ejs = require('ejs');
let { CUSTOM_REQUEST_FILE_PATH, BASE_FILE_PATH } = require('./utils/constant');

const contentTemplate = `import request from '<%= requestPath %>';
import { <%= item.responsesRef %>
    <% if(item.requestBody && item.requestBody.$ref){ %>
        ,<%= item.requestBody.$ref %>
    <% }  %>
} from '../../interface';

/**
 * <%= serverName + item.name %>
 * <%= item.path %>
 */
export function <%= requireName.lowercaseFirstLetter %>(
    <% if(item.requestQuery){ %>params: <%= requireName.capitalFirstLetter %>Params
    <% }else if(item.requestBody && item.requestBody.$ref){%>params: <%= item.requestBody.$ref %>
    <% }else if(item.requestBody && item.requestBody.paramsObj ){%>params: <%= getTypeString(item.requestBody.paramsObj) %>
    <% } %>){return request.<%= item.method %><any,<%= item.responsesRef %><% if(item.method != 'post'){ %>,any<%}%>>(\`<%= item.path %>\`, 
    <% if(item.requestQuery){ %>{ params }
    <% }else if(item.requestBody && item.requestBody.$ref){%>params
    <% }else if(item.requestBody && item.requestBody.paramsObj && item.method == 'delete'){%>{ data: params }
    <% }else if(item.requestBody && item.requestBody.paramsObj && item.method != 'delete'){%>params
    <% } %>);
}

<% if (item.requestQuery) { %>
  interface <%= requireName.capitalFirstLetter %>Params {
    <% item.requestQuery.forEach((itemKey)=> { %>
      /** <%= itemKey.description %> */
      <%= itemKey.name %><% if (itemKey.nullable) { %>?<% } %>: <%= getTypeString(itemKey.schema) %>;
  <% }) %>
  }
<% } %>

`;

/**
 * 类型判断辅助函数
 * @param {Object} itemKey
 * @returns
 */
function getTypeString(property) {
	if (property['type'] === 'integer') {
		return 'number';
	} else if (property['type'] === 'array' && property['items'].type) {
		return getTypeString(property['items']) + '[]';
	} else if (property['type'] === 'array') {
		return 'any[]';
	} else if (property['type'] == undefined) {
		return 'any';
	} else {
		return property['type'];
	}
}

function renderController(obj) {
	let tags = obj.tags;
	let paths = obj.paths;
	//controller主目录下的index.ts文件内容
	let indexMainContentStr = '';
	let indexMainFilePath = BASE_FILE_PATH + `/controller/index.ts`;

	let data = handleControllerInfo(tags, paths);
	if (!data) return;
	for (let i = 0; i < data.length; i++) {
		let item = data[i];
		//每个接口目录下的index.ts文件内容
		let indexContentStr = '';
		//每个接口目录下的index.ts路径
		let indexFilePath = BASE_FILE_PATH + `/controller/${item.name}/index.ts`;
		indexMainContentStr += `export * from "./${item.name}";\r`;

		//pathInfo
		if (item.pathInfo) {
			for (let j = 0; j < item.pathInfo.length; j++) {
				let itemChild = item.pathInfo[j];
				let templateStr = ejs.render(contentTemplate, {
					requireName: { lowercaseFirstLetter: toLowerCaseFirstLetter(itemChild.requireName), capitalFirstLetter: itemChild.requireName },
					serverName: item.name,
					item: itemChild,
					getTypeString: getTypeString,
					requestPath: CUSTOM_REQUEST_FILE_PATH,
				});
				let filePath = BASE_FILE_PATH + `/controller/${item.name}/${itemChild.requireName}.ts`;
				indexContentStr += `export * from "./${itemChild.requireName}";\r`;
				renderFile(filePath, templateStr);
			}
			renderFile(indexFilePath, indexContentStr);
		} else {
			// console.log(item)
		}
	}
	renderFile(indexMainFilePath, indexMainContentStr);
}

//处理swagger中的tags，paths 数据,将两种数据合并，作为模板使用数据
function handleControllerInfo(tags, paths) {
	try {
		tags.forEach((item) => {
			Object.defineProperty(item, 'pathInfo', {
				value: [],
				writable: true,
				enumerable: true,
				configurable: true,
			});
		});
		let tagsArr = tags;

		for (let key in paths) {
			let obj = {};
			//请求信息
			let pathsItem = paths[key];
			let requireNameArr = key.split('/');
			obj.path = key;

			for (let keyChild in pathsItem) {
				//keyChild请求方法 以及 pathsItemChild请求信息
				let pathsItemChild = pathsItem[keyChild];
				//接口名称
				obj.name = pathsItemChild.summary;

				//body  处理
				if (pathsItemChild.requestBody) {
					let content = pathsItemChild.requestBody.content;
					//请求参数的类型
					for (let keyContent in content) {
						obj.requestBody = {};
						if (content[keyContent].schema['$ref']) {
							obj.requestBody.$ref = content[keyContent].schema['$ref'].replace('#/components/schemas/', '');
						}
						if (content[keyContent].schema['type']) {
							obj.requestBody.paramsObj = content[keyContent].schema;
						}
						break;
					}
				}

				//query 处理
				pathsItemChild.parameters ? (obj.requestQuery = pathsItemChild.parameters) : '';

				// responses处理
				if (pathsItemChild.responses) {
					let responsesItem = pathsItemChild.responses;
					for (let keyResultCode in responsesItem) {
						let resulteCodeItem = responsesItem[keyResultCode].content;
						//响应参数的类型
						for (let keyContent in resulteCodeItem) {
							if (resulteCodeItem[keyContent].schema['$ref']) {
								//响应返回值类型
								obj.responsesRef = resulteCodeItem[keyContent].schema['$ref'].replace('#/components/schemas/', '');
								break;
							}
						}
					}
				}
				//生成文件名 有唯一性
				obj.tags = pathsItemChild.tags[0];
				//请求方法
				obj.method = keyChild;
				//请求方法名称
				obj.requireName = obj.tags + snakeToCamel(requireNameArr[requireNameArr.length - 1]);
			}

			tagsArr = tagsArr.map((item) => {
				if (item.name == obj.tags) {
					item.pathInfo.push(obj);
				}
				return item;
			});
		}

		//生成数据文件，以便调试
		// renderFile('./aa.json', JSON.stringify(tagsArr))

		return tagsArr;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	renderController,
};
