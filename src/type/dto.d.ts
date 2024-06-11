/** 统一结果输出 */
declare interface Result<T> {
[x: string]: number;
	/** 是否成功标记 */
	success: boolean;
	/** 编码 */
	code: string;
	/** 消息 */
	msg: string;
	/** 返回数据 */
	data?: T | null;
}

/** 统一分页输入 */
declare interface IPageInput {
	/** 当前页标 */
	currentPage?: number | null;
	/** 每页大小 */
	pageSize?: number | null;
	/** 查询条件 */
	dynamicFilter?: IDynamicFilterInfo | null;
}

/** 统一分页输出 */
declare interface IPageOutput<T> {
	/** 当前页标 */
	total: number;
	/** 查询条件 */
	list: Array<T>;
}

/** 统一查询条件 */
declare interface IDynamicFilterInfo {
	/** 字段名 */
	field?: string | null;
	/**
	 * 判断方法
	 * Contains=0,StartsWith=1,EndsWith=2,NotContains=3,NotStartsWith=4,NotEndsWith=5,Equal=6,Equals=7,Eq=8,NotEqual=9,GreaterThan=10,GreaterThanOrEqual=11,LessThan=12,LessThanOrEqual=13,Range=14,DateRange=15,Any=16,NotAny=17,Custom=18
	 */
	operator?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
	/** 字段值 */
	value?: any;
	/**
	 * 或 与 与sql一样
	 * And=0,Or=1
	 */
	logic?: 0 | 1;
	/** 递归查询条件 */
	filters?: IDynamicFilterInfo[] | null;
}

/** 统一下载文件信息 */
declare interface IDownloadFileInfo {
	/** 文件base64数据 */
	fileContents: string;
	/** 文件类型 */
	contentType: string;
	/** 文件名称 */
	fileDownloadName: string;
	/** 最后修改 */
	lastModified: string | null;
	/** entityTag */
	entityTag: string | null;
	/** enableRangeProcessing */
	enableRangeProcessing: boolean | null;
}
