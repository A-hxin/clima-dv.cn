let ejs = require('ejs');
let { renderFile } = require('./utils/index');
let { BASE_FILE_PATH } = require('./utils/constant');

/**
 * 类型判断辅助函数
 * @param {Object} property  components中property中的字段
 * @returns
 */
function getTypeString(property) {
	if (property['$ref']) {
		return property['$ref'].replace('#/components/schemas/', '');
	} else {
		if (property['type'] === 'integer') {
			return 'number';
		} else if (property['type'] === 'array' && property['items']['$ref']) {
			return property['items']['$ref'].replace('#/components/schemas/', '') + '[]';
		} else if (property['type'] === 'array') {
			return 'any[]';
		} else if (property['type'] == undefined) {
			return 'any';
		} else {
			return property['type'];
		}
	}
}

/**
 * 生成ApiTypes 类型文件
 * @param {Object} obj swagger的json对象
 */
function renderApiTypes(obj) {
	for (let key in obj.components.schemas) {
		const content = `<% let properties = item.properties;
               let itemEnum = item.enum;
               let arr = []
               if (properties) { %>
                      <% Object.keys(properties).forEach(function(itemKey) { %>
                        <% if (properties[itemKey]['$ref']) { %>
                           <% arr.push(properties[itemKey]['$ref'].replace('#/components/schemas/','')) %>
                        <% } %>
                         
                        <% if (properties[itemKey] && properties[itemKey]['type'] === 'array' && properties[itemKey]['items']['$ref']) { %>
                            <% arr.push(properties[itemKey]['items']['$ref'].replace('#/components/schemas/', '')) %>
                        <% } %>
                        
                      <% }) %>


                      <% if (arr.length) { %>
                          import { <% [...new Set(arr)].forEach(el => { if(el != key){%>
                            <%= el %>,
                            <%}}) %> } from "../../interface";
                     <% } %>
                      

                  export interface <%= key %> {
                  <% Object.keys(properties).forEach(function(itemKey) { %>
                      /** <%= properties[itemKey].description %> */
                      <%= itemKey %><% if (properties[itemKey].nullable) { %>?<% } %>: <%= getTypeString(properties[itemKey]) %>;
                  <% }) %>
              }
              <% } else if(itemEnum) {%>
                  /** <%= itemEnum.description %> */
                  export enum <%= key %> {
                      <% itemEnum.forEach(function(itemKey,itemIndex) { %>
                          <%= itemKey %>=<%= itemIndex %>,
                      <% }) %>
                  }
              <% } %>`;
		let templateStr = ejs.render(content, { key: key, item: obj.components.schemas[key], getTypeString: getTypeString });
		const filePath = BASE_FILE_PATH + `/interface/apiTypes/${key}.ts`;

		renderFile(filePath, templateStr);
	}
	//生成主文件，将全部类型导入文件
	const apiTypesIndexfilePath = BASE_FILE_PATH + `/interface/index.ts`;
	const apiTypesIndexTemplate = `<% Object.keys(schemas).forEach(function(itemKey) { %>
                      export * from "./apiTypes/<%= itemKey %>";
                  <% }) %>`;
	let apiTypesIndexTemplateStr = ejs.render(apiTypesIndexTemplate, { schemas: obj.components.schemas });

	renderFile(apiTypesIndexfilePath, apiTypesIndexTemplateStr);
}

module.exports = {
	renderApiTypes,
};
