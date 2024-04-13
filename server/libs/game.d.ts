type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
/** 获取对象上所有readonly字段名 */
type ReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P> }[keyof T];
/** 获取对象上所有非readonly字段名 */
type NonReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never> }[keyof T];
/** 获取对象上所有方法名 */
type MethodKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];
/** 获取对象上所有非方法名 */
type NonMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? never : P }[keyof T];

declare type ReadonlyAll<T> = { readonly [P in keyof T]: T[P] extends Function ? T[P] : ReadonlyAll<T[P]>; };
declare type Class<T> = new (...args: any) => T;
declare interface KeyMap<T> { [ key: string ]: T; }