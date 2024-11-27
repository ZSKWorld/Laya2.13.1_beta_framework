
/** Laya扩展 */
export class LayaExtension {
	static extends() {
		this.scriptExtend();
		this.script3DExtend();
		this.vector2Extend();
		this.templetExtend();
		this.skeletonExtend();
	}

	/** Laya.Script完善 */
	private static scriptExtend() {
		const prototype: Laya.Script & { _onAdded?: () => void } = Laya.Script.prototype;
		const _onAdded = prototype._onAdded;
		prototype._onAdded = function () {
			_onAdded.call(this);
			this.gowner = this.owner.$owner;
			this.onAdded();
		}
		prototype.onAdded = function () { }
	}

	private static script3DExtend() {
		if (!Laya.Script3D) return;
		const prototype: Laya.Script3D & { _onAdded?: () => void } = Laya.Script3D.prototype;
		const _onAdded = prototype._onAdded;
		prototype._onAdded = function () {
			_onAdded.call(this);
			this.onAdded();
		}
		prototype.onAdded = function () { }
	}

	/** Laya.Vector2扩展 */
	private static vector2Extend() {
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

	private static templetExtend() {
		const prototype = Laya.Templet.prototype;
		Object.defineProperties(prototype, {
			skBufferUrl: {
				get() { return this._skBufferUrl; },
			}
		});
	}

	private static skeletonExtend() {
		const prototype = Laya.Skeleton.prototype;
		const init = prototype.init;
		prototype.init = function (templet: Laya.Templet, aniMode = 0) {
			init.call(this, templet, aniMode);
			this._player.on(Laya.Event.COMPLETE, this, this._onComplete);
		};
		prototype["_onComplete"] = function () {
			this.event(Laya.Event.COMPLETE);
		};
	}
}