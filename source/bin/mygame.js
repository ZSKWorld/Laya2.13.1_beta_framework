window.SaxO = {};
window.htmlEntity = {};
//注入全局变量
window.WindowImmit = function (name, obj) { window[name] = obj; }

//用于扩展类字段，在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
window.ExtensionClass = function (cls) { return cls; }