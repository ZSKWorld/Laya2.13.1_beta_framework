/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigXinFaBookData {
	/**id */
	readonly ID: number;
	/**每级心法增加的精力恢复 */
	readonly JLHFAdd: number;
	/**每级心法增加的精力上限 */
	readonly JLAdd: number;
	/**对应技能 */
	readonly Skills: number[];
}

declare interface ConfigXinFaBook extends KeyMap<ConfigXinFaBookData> {
	readonly 6000: ConfigXinFaBookData;
	readonly 6001: ConfigXinFaBookData;
	readonly 6002: ConfigXinFaBookData;
	readonly 6003: ConfigXinFaBookData;
	readonly 6004: ConfigXinFaBookData;
	readonly 6005: ConfigXinFaBookData;
	readonly 6006: ConfigXinFaBookData;
	readonly 6007: ConfigXinFaBookData;
	readonly 6008: ConfigXinFaBookData;
}