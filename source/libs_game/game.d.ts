declare type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
/** 获取对象上所有readonly字段名 */
declare type ReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P> }[keyof T];
/** 获取对象上所有非readonly字段名 */
declare type NonReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never> }[keyof T];
/** 获取对象上所有方法名 */
declare type MethodKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];
/** 获取对象上所有非方法名 */
declare type NonMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? never : P }[keyof T];

declare type ReadonlyAll<T> = { readonly [P in keyof T]: T[P] extends Function ? T[P] : ReadonlyAll<T[P]>; };
declare type PartialAll<T> = { [P in keyof T]?: Partial<T[P]>; };
declare type KeyMap<T> = { [key: string]: T; };
declare type Class<T> = new (...args: any) => T;

/** 注入全局变量 */
declare function WindowImmit(name: string, obj: any): void;

/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param cls 要扩展的类
 * @returns 扩展后的类
 */
declare function ExtensionClass<E, T>(cls: Class<T>): Class<T & E>;

/**
 * 确认弹窗
 * @param title
 * @param msg
 * @param cancel 默认true
 */
declare function ShowConfirm(title: string, msg: string, cancel?: boolean): Promise<boolean>;

/**
 * @description: 添加全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function RegisterEvent(eventName: string, once?: boolean, args?: any[]): MethodDecorator;

declare namespace Laya {
    interface Node extends Laya.EventDispatcher {
        addChild<T extends Node>(node: T): T;
        addChildAt<T extends Node>(node: T, index: number): T;
        addComponentIntance<T extends Laya.Component>(component: T): T;
        addComponent<T extends Laya.Component>(componentType: Class<T>): T;
        getComponent<T extends Laya.Component>(componentType: Class<T>): T;
        getComponents<T extends Laya.Component>(componentType: Class<T>): T[];
    }
    interface Script {
        readonly owner: Laya.Sprite;
        readonly gowner: fgui.GObject;
        /**
         * 组件被挂载后执行，此方法只执行一次
         * 此方法为虚方法，使用时重写覆盖即可
         */
        onAdded(): void;
    }
    interface Script3D {
        readonly owner: Laya.Sprite3D;
        /**
         * 组件被挂载后执行，此方法只执行一次
         * 此方法为虚方法，使用时重写覆盖即可
         */
        onAdded(): void;
    }
    interface Vector2 {
        get length(): number;
        get lengthSquared(): number;
        add(v2: Vector2): Vector2;
        add(x: number, y: number): Vector2;
        sub(v2: Vector2): Vector2;
        scale(scale: number): Vector2;
        normalize(): Vector2;
        /**
         * 旋转向量，角度大于0 顺时针旋转，小于0 逆时针旋转
         * @param angle
         */
        rotate(angle: number): Vector2;
        copyTo(v2: Vector2): Vector2;
        copyFrom(x: number, y: number): Vector2;
        dot(v2: Vector2): number;
        lerp(v2: Vector2, t: number): Vector2;
        slerp(end: Vector2, t: number): Vector2;
    }
    interface Templet {
        skBufferUrl: string;
    }
}

declare namespace fgui {
    interface GObject {
        tweenMove(endX: number, endY: number, duration: number): GTweener;
        tweenMoveX(endX: number, duration: number): GTweener;
        tweenMoveY(endY: number, duration: number): GTweener;
        tweenScale(endX: number, endY: number, duration: number): GTweener;
        tweenScaleX(endX: number, duration: number): GTweener;
        tweenScaleY(endY: number, duration: number): GTweener;
        tweenResize(endW: number, endH: number, duration: number): GTweener;
        tweenFade(endValue: number, duration: number): GTweener;
        tweenRotate(endValue: number, duration: number): GTweener;

        addComponentIntance<T extends Laya.Component>(component: T): T;
        addComponent<T extends Laya.Component>(componentType: Class<T>): T;
        getComponent<T extends Laya.Component>(componentType: Class<T>): T;
        getComponents<T extends Laya.Component>(componentType: Class<T>): T[];
        event(type: string, data?: any): boolean;
        once(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher;
        offAll(type?: string): Laya.EventDispatcher;
        offAllCaller(caller: any): Laya.EventDispatcher;

        /**
         * 给当前GObject添加用on注册的事件锁，为空则为全局锁。
         * 全局锁 会阻止所有的事件触发， 而指定事件的锁只阻止指定的事件触发。全局锁和事件锁可以同时存在，所以只有全局锁和事件锁都移除才会触发事件
         * @param type 事件名称
         * @param lockChild 是否加锁子节点，默认true。 如果为true， 则子节点也会加对应事件锁
         */
        addEventLock(type?: string, lockChild?: boolean): void;

        hasEventLock(type?: string): boolean;

        /**
         * 移除当前GObject的事件锁，为空则移除全局锁
         * @param type 事件名称
         */
        removeEventLock(type?: string): void;

        /**移除所有事件锁 */
        removeAllEventLock(): void;
    }
}