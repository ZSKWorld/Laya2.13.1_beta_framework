
/** Laya扩展 */
export class LayaExtension {
	static Init() {
		this.ScriptImprove();
		this.Vector2Improve();
	}

	/** Laya.Script完善 */
	private static ScriptImprove() {
		const scriptPrototype: Laya.Script & { _onAdded?: () => void } = Laya.Script.prototype;
		const scriptOnAdded = scriptPrototype._onAdded;
		scriptPrototype._onAdded = function () {
			scriptOnAdded.call(this);
			this.onAdded();
		}
		scriptPrototype.onAdded = function () { }

		if (Laya.Script3D) {
			const script3dPrototype: Laya.Script3D & { _onAdded?: () => void } = Laya.Script3D.prototype;
			const script3dOnAdded = script3dPrototype._onAdded;
			script3dPrototype._onAdded = function () {
				script3dOnAdded.call(this);
				this.onAdded();
			}
			script3dPrototype.onAdded = function () { }
		}
	}

	/** Laya.Vector2扩展 */
	private static Vector2Improve() {
		if (!Laya.Vector2) return;
		const prototype = Laya.Vector2.prototype;
		Object.defineProperties(prototype, {
			length: {
				get() { return Math.sqrt(this.lengthSquared); },
			},
			lengthSquared: {
				get() {
					const { x, y } = this;
					return x * x + y * y;
				},
			},
			add: {
				value: function (v1: number | Laya.Vector2, v2) {
					const { x, y } = this;
					if (typeof v1 == "number") this.setValue(x + v1, y + v2);
					else this.setValue(x + v1.x, y + v1.y);
					return this;
				}
			},
			sub: {
				value: function (v2) {
					this.setValue(this.x - v2.x, this.y - v2.y);
					return this;
				}
			},
			scale: {
				value: function (scale) {
					this.setValue(this.x * scale, this.y * scale);
					return this;
				}
			},
			normalize: {
				value: function () {
					Laya.Vector2.normalize(this, this);
					return this;
				}
			},
			rotate: {
				value: function (angle) {
					const radian = angle * Math.PI / 180;
					const cos = Math.cos(radian);
					const sin = Math.sin(radian);
					const { x, y } = this;
					this.setValue(x * cos - y * sin, x * sin + y * cos);
					return this;
				}
			},
			copyTo: {
				value: function (v2) {
					v2.setValue(this.x, this.y);
					return v2;
				}
			},
			copyFrom: {
				value: function (x, y) {
					this.setValue(x, y);
					return this;
				}
			},
			dot: {
				value: function (v2) {
					return Laya.Vector2.dot(this, v2);
				}
			},
			lerp: {
				value: function (b, t) {
					const { x, y } = this;
					this.x = x + t * (b.x - x);
					this.y = y + t * (b.y - y);
					return this;
				}
			},
			slerp: {
				value: function (end, t) {
					const dot = Math.min(Math.max(this.dot(end), -1), 1);
					const theta = Math.acos(dot) * t;
					const relativeVec = end.clone().sub(this.clone().scale(dot));
					relativeVec.normalize();
					return this.scale(Math.cos(theta)).add(relativeVec.scale(Math.sin(theta)));
				}
			}
		});
	}
}