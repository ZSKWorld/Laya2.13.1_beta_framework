import { MathUtil } from "../core/libs/math/MathUtil";
/** Laya扩展 */
export class LayaExtension{
    static Init(): void{
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
		if (!Laya.Vector2) return;
		const proto = Laya.Vector2.prototype;
		Object.defineProperty(proto, "length", {
			get() { return Math.sqrt(this.lengthSquared); }
		});
		Object.defineProperty(proto, "lengthSquared", {
			get() { return this.x * this.x + this.y * this.y; }
		});
		proto.add = function (v1, v2 = 0) {
			if (typeof v1 == "number") this.setValue(this.x + v1, this.y + v2);
			else this.setValue(this.x + v1.x, this.y + v1.y);
			return this;
		}
		proto.sub = function (v2: Laya.Vector2) {
			this.setValue(this.x - v2.x, this.y - v2.y);
			return this;
		}
		proto.scale = function (scale: number) { 
				this.setValue(this.x * scale, this.y * scale);
				return this;
		}
		proto.normalize = function () { 
			const { x, y } = this;
			let len = x * x + y * y;
			if (len > 0) {
				len = 1 / Math.sqrt(len);
				this.setValue(x * len, y * len);
			}
			return this;
		}
		proto.rotate = function (angle: number) {
			const radian = angle * Math.PI / 180;
			const cos = Math.cos(radian);
			const sin = Math.sin(radian);
			const { x, y } = this;
			this.setValue(x * cos - y * sin, x * sin + y * cos);
			return this;
		}
		proto.copyTo = function (v2: Laya.Vector2) {
			v2.setValue(this.x, this.y);
			return v2;
		}
	}
}