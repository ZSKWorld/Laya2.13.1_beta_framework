window.SaxO = {};
window.htmlEntity = {};
//注入全局变量
window.WindowImmit = function (name, obj) { window[name] = obj; }

//用于扩展类字段，在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
window.ExtensionClass = function (cls) { return cls; }


WindowImmit("RegisterEvent", function (eventName, once, args) {
    return function (target, propertyKey, descriptor) {
        if (!target.__eventMap) target.__eventMap = {};
        if (!target.__eventMap[eventName]) target.__eventMap[eventName] = [];

        const func = descriptor.value;
        const list = target.__eventMap[eventName];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[eventName] = func[eventName] || {};
                func[eventName].__once = once;
            }
            if (args) {
                func[eventName] = func[eventName] || {};
                func[eventName].__args = args;
            }
        }
    };
});

/** 按键事件类型 */
WindowImmit("KeyEventType", (function (enumObj) {
    enumObj["KeyDown"] = "keydown";
    enumObj["KeyPress"] = "keypress";
    enumObj["KeyUp"] = "keyup";
    return enumObj;
})({}));

/** 鼠标事件类型 */
WindowImmit("MouseEventType", (function (enumObj) {
    enumObj["MouseOver"] = "mouseover";
    enumObj["MouseDown"] = "mousedown";
    enumObj["MouseMove"] = "mousemove";
    enumObj["MouseUp"] = "mouseup";
    enumObj["MouseOut"] = "mouseout";
    enumObj["DoubleClick"] = "doubleclick";
    enumObj["RightClick"] = "rightclick";
    enumObj["Click"] = "click";
    enumObj["StageMouseDown"] = "stagemousedown";
    enumObj["StageMouseMove"] = "stagemousemove";
    enumObj["StageMouseUp"] = "stagemouseup";
    enumObj["StageClick"] = "stageclick";
})({}));

WindowImmit("ViewKeyEvent", function (name, key = -1, once = false, args = null) {
    return function (target, propertyKey, descriptor) {
        if (!target.__keyEventList) target.__keyEventList = {};
        if (!target.__keyEventList[name]) target.__keyEventList[name] = {};
        if (!target.__keyEventList[name][key]) target.__keyEventList[name][key] = [];

        const func = descriptor.value;
        const list = target.__keyEventList[name][key];
        if (list.indexOf(func) < 0) {
            list.push(func);
            if (once) {
                func[key] = func[key] || {};
                func[key].__once = true;
            }
            if (args) {
                func[key] = func[key] || {};
                func[key].__args = args;
            }
        }
    }
});

WindowImmit("ViewMouseEvent", function (name, once, args) {
    return function (target, propertyKey, descriptor) {
        if (!target.__mouseEventList) target.__mouseEventList = {};
        if (!target.__mouseEventList[name]) target.__mouseEventList[name] = [];

        const func = descriptor.value;
        const list = target.__mouseEventList[name];
        if (list.indexOf(func) < 0) {
            list.push(func);
            if (once) {
                func[name] = func[name] || {};
                func[name].__once = once;
            }
            if (args) {
                func[name] = func[name] || {};
                func[name].__args = args;
            }
        }
    }
});

WindowImmit("ViewMessage", function (name, once, args) {
    return function (target, propertyKey, descriptor) {
        if (!target.__messageMap) target.__messageMap = {};
        if (!target.__messageMap[name]) target.__messageMap[name] = [];

        const func = descriptor.value;
        const list = target.__messageMap[name];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[name] = func[name] || {};
                func[name].__once = once;
            }
            if (args) {
                func[name] = func[name] || {};
                func[name].__args = args;
            }
        }
    }
});