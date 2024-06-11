const fs = require('fs');
const path = require('path');
//格式化生成文件
const prettier = require('prettier');

const options = {
	printWidth: 999,
	tabWidth: 4,
	proseWrap: 'never',
	trailingComma: 'none',
	//生成接口文件，和类型文件时，不要把semi设置为false，否则vue文件无法生成
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	vueIndentScriptAndStyle: false,
	parser: 'typescript',
};

/**
 * 生成文件
 * @param {*} filePath 文件路径
 * @param {*} content 内容
 * @param {*} opt prettier配置
 */
function renderFile(filePath, content, opt) {
	const directory = path.dirname(filePath);

	fs.mkdir(directory, { recursive: true }, async (err) => {
		if (err) {
			console.error(filePath + '创建目录时发生错误：', err);
			return;
		}
		// 将代码格式化
		const formattedCode = await prettier.format(content, opt ? opt : options);

		// 同步写入文件
		try {
			fs.writeFileSync(filePath, formattedCode);
			// console.log(filePath + '文件写入成功')
		} catch (err) {
			console.error(filePath + '写入文件时发生错误：', err);
		}
	});
}

/**
 * 将蛇形命名修改成驼峰命名 （首字母大写）
 * @param {string} s 蛇形命名字符串
 * @returns
 */
function snakeToCamel(s) {
	return s
		.split('-')
		.map((word, index) => {
			if (index === 0) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			} else {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
		})
		.join('');
}

// 将蛇形命名修改成驼峰命名 （首字母小写）
// function snakeToCamel(s) {
//     return s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
//   }

/**
 * 将字符串的首字母改为小写
 * @param {string} str 字符串
 * @returns
 */
function toLowerCaseFirstLetter(str) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 将字符串的首字母改为大写
 * @param {string} str 字符串
 * @returns
 */
function toCapitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 获取url请求头
 * @param {string} url url地址
 * @returns
 */
function getProtocol(url) {
	var protocol = url.split(':')[0];
	return protocol;
}

module.exports = {
	renderFile,
	snakeToCamel,
	toCapitalizeFirstLetter,
	toLowerCaseFirstLetter,
	getProtocol,
};
