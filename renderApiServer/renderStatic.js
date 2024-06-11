let { renderFile } = require('./utils/index');
let ejs = require('ejs');
let { CUSTOM_REQUEST_FILE_PATH, BASE_FILE_PATH } = require('./utils/constant');

const contentTemplate = `
import request from '<%= requestPath %>';

/**
 * 查询接口
 * 获得swagger json
 */
export function getSwaggerJson(path: string) {
	return request.get<any, any, any>(path);
}
`;
function renderStatic() {
	let indexFilePath = BASE_FILE_PATH + `/swagger/index.ts`;
	let templateStr = ejs.render(contentTemplate, { requestPath: CUSTOM_REQUEST_FILE_PATH });

	renderFile(indexFilePath, templateStr);
}

module.exports = {
	renderStatic,
};
