let { getProtocol } = require('./utils/index');
let { renderApiTypes } = require('./renderApiTypes');
let { renderController } = require('./renderController');
let { renderStatic } = require('./renderStatic');
let { renderVue } = require('./renderVue/index.js');
let { Swagger_PATH } = require('./utils/constant');

const https = require(`${getProtocol(Swagger_PATH)}`);

let obj;

async function main() {
	let res = await getSwaggerData();
	// components
	// info
	// openapi
	// paths
	// security
	// servers
	// tags
	if (!res) return;

	obj = JSON.parse(res);

	renderApiTypes(obj);
	renderController(obj);
	renderStatic();
	renderVue(obj);
}

main();

/**
 * 获取swagger文件
 * @returns json
 */
function getSwaggerData() {
	return new Promise((resolve, reject) => {
		https
			.get(Swagger_PATH, (response) => {
				let fileData = '';

				response.on('data', (chunk) => {
					fileData += chunk;
				});

				response.on('end', () => {
					resolve(fileData);
				});
			})
			.on('error', (err) => {
				reject(err);
				console.error(`下载文件时出现错误：${err.message}`);
			});
	});
}
