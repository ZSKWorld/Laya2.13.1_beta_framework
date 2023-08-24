
/** Laya扩展 */
export class LayaExtension {
	static Init() {
		this.ScriptImprove();
		this.Vector2Improve();
	}

	/** Laya.Script完善 */
	private static ScriptImprove() {
		const proto = Laya.Script.prototype;
		proto[ "_onAdded" ] = function () {
			this.onAdded();
		}
		proto[ "onAdded" ] = function () {

		}
	}

	/** Laya.Vector2扩展 */
	private static Vector2Improve() {
		Laya.Vector2 = class Vector2 {
			static ZERO = new Vector2(0.0, 0.0);
			static ONE = new Vector2(1.0, 1.0);
			x: number;
			y: number;
			constructor(x = 0, y = 0) {
				this.x = x;
				this.y = y;
			}
			setValue(x, y) {
				this.x = x;
				this.y = y;
			}
			fromArray(array, offset = 0) {
				this.x = array[ offset + 0 ];
				this.y = array[ offset + 1 ];
			}
			toArray(array, offset = 0) {
				array[ offset + 0 ] = this.x;
				array[ offset + 1 ] = this.y;
			}
			cloneTo(destObject) {
				var destVector2 = destObject;
				destVector2.x = this.x;
				destVector2.y = this.y;
			}
			clone() {
				var destVector2 = new Vector2();
				this.cloneTo(destVector2);
				return destVector2;
			}
			forNativeElement(nativeElements?: Float32Array | null) { }

			get length() {
				return Math.sqrt(this.lengthSquared);
			}
			get lengthSquared() {
				const { x, y} = this;
				return x * x + y * y;
			}

			add(v1):Vector2;
			add(v1, v2?) {
				if (typeof v1 == "number") this.setValue(this.x + v1, this.y + v2);
				else this.setValue(this.x + v1.x, this.y + v1.y);
				return this;
			}
			sub(v2) {
				this.setValue(this.x - v2.x, this.y - v2.y);
				return this;
			}
			scale(scale) {
				this.setValue(this.x * scale, this.y * scale);
				return this;
			}
			normalize() {
				const { x, y } = this;
				let len = x * x + y * y;
				if (len > 0) {
					len = 1 / Math.sqrt(len);
					this.setValue(x * len, y * len);
				}
				return this;
			}
			rotate(angle) {
				const radian = angle * Math.PI / 180;
				const cos = Math.cos(radian);
				const sin = Math.sin(radian);
				const { x, y } = this;
				this.setValue(x * cos - y * sin, x * sin + y * cos);
				return this;
			}
			copyTo(v2) {
				v2.setValue(this.x, this.y);
				return v2;
			}
			copyFrom(x, y) {
				this.setValue(x, y);
				return this;
			}
			dot(v2) {
				return (this.x * v2.x) + (this.y * v2.y);
			}

			lerp(b, t) {
				var a = this;
				var ax = a.x, ay = a.y;
				this.x = ax + t * (b.x - ax);
				this.y = ay + t * (b.y - ay);
				return this;
			}
			slerp(end, t) {
				let dot = this.dot(end);
				dot =  Math.min(Math.max(dot, -1), 1);
				const theta = Math.acos(dot) * t;
				const relativeVec = end.clone().sub(this.clone().scale(dot));
				relativeVec.normalize();
				return this.scale(Math.cos(theta)).add(relativeVec.scale(Math.sin(theta)));
			}
			static scale(a, b, out) {
				out.x = a.x * b;
				out.y = a.y * b;
			}
			static dot(a, b) {
				return a.dot(b);
			}
			static normalize(s, out) {
				var x = s.x, y = s.y;
				var len = x * x + y * y;
				if (len > 0) {
					len = 1 / Math.sqrt(len);
					out.x = x * len;
					out.y = y * len;
				}
			}
			static scalarLength(a) {
				return a.length;
			}
			static rewriteNumProperty(proto: any, name: string, index: number) { }
		}
	}
}