// /**
// * name
// */
module fight.duel {
    import Vector3 = Laya.Vector3;
    import Quaternion = Laya.Quaternion;
    import Sprite3D = Laya.Sprite3D;
    import Handler = Laya.Handler;

    export const enum AnimationPropertyType {
        None = "None",
        LocalPosition = "LocalPosition",
        LocalEuler = "LocalEuler",
        LocalScale = "LocalScale",
    }
    export class KeyFrame {
        x: number = 0;
        y: number = 0;
        inTangent: number = 0;
        outTangent: number = 0;

        private constructor() { }

        static getData(x: number, y: number, inTangent: number, outTangent: number) {
            const data = Laya.Pool.getItemByClass("DuelKeyFrame", KeyFrame as any) as KeyFrame;
            data.x = x;
            data.y = y;
            data.inTangent = inTangent;
            data.outTangent = outTangent;
            return data;
        }

        static recoverData(data: KeyFrame) {
            data.x = data.y = data.inTangent = data.outTangent = 0;
            Laya.Pool.recover("DuelKeyFrame", data);
        }
    }

    export class AnimationCurve {
        propertyeType = AnimationPropertyType.None;
        curves: KeyFrame[][] = [];

        private constructor() { }

        static getData() {
            return Laya.Pool.getItemByClass("DuelAnimationCurve", AnimationCurve as any) as AnimationCurve;
        }

        static recoverData(data: AnimationCurve) {
            data.propertyeType = AnimationPropertyType.None;
            data.curves.forEach(v => v.forEach(KeyFrame.recoverData));
            data.curves.length = 0;
            Laya.Pool.recover("DuelAnimationCurve", data);
        }
    }

    export class CardCurve extends Laya.Script3D {
        private _datas: AnimationCurve[] = [];
        private _playing: boolean = false;
        private _time: number = 0;
        delay: number = 0;
        duration: number = 0;
        onFrame: Laya.Handler;
        onEnd: Laya.Handler;
        get transform() { return this.owner.transform; }

        addAnimationCurve(data: AnimationCurve) {
            this._datas.push(data);
        }

        play() {
            this._time = 0;
            this._playing = true;
        }

        playImmediately() {
            this._time = this.duration;
            this.updateAnim();
        }

        override onUpdate() {
            if (!this._playing) return;
            const delta = Laya.timer.delta / 1000;
            this.delay -= delta;
            if (this.delay > 0) return;
            this._time += delta;
            this.updateAnim();
        }

        override onReset() {
            this._datas.forEach(AnimationCurve.recoverData);
            this._datas.length = 0;
            this._time = 0;
            this.delay = 0;
            this.duration = 0;
            this._playing = false;
            if (this.onFrame) {
                this.onFrame.recover();
                this.onFrame = null;
            }
            if (this.onEnd) {
                this.onEnd.recover();
                this.onEnd = null;
            }
        }

        private updateAnim() {
            const { _time, duration, _datas, transform, onFrame, onEnd } = this;
            _datas.forEach(v => {
                let property: Vector3;
                switch (v.propertyeType) {
                    case AnimationPropertyType.LocalPosition: property = transform.localPosition; break;
                    case AnimationPropertyType.LocalEuler: property = transform.localRotationEuler; break;
                    case AnimationPropertyType.LocalScale: property = transform.localScale; break;
                    default: return;
                }
                property.x = this.hermiteInterpolate(v.curves[0], _time, property.x);
                property.y = this.hermiteInterpolate(v.curves[1], _time, property.y);
                property.z = this.hermiteInterpolate(v.curves[2], _time, property.z);
                switch (v.propertyeType) {
                    case AnimationPropertyType.LocalPosition: transform.localPosition = property; break;
                    case AnimationPropertyType.LocalEuler: transform.localRotationEuler = property; break;
                    case AnimationPropertyType.LocalScale: transform.localScale = property; break;
                }
            });
            const progress = Math.min(Math.max(_time / duration, 0), 1);
            if (onFrame) onFrame.runWith(progress);
            if (progress >= 1) {
                this._playing = false;
                if (onEnd) onEnd.run();
                this.onReset();
            }
        }

        private hermiteInterpolate(curve: KeyFrame[], t: number, defaultValue: number) {
            defaultValue ||= 0;
            if (!curve) return defaultValue;
            const n = curve.length;
            if (n < 1) return defaultValue;
            if (t <= curve[0].x) return curve[0].y;
            if (t >= curve[n - 1].x) return curve[n - 1].y;
            if (n == 1) return curve[0].y;
            for (let i = 1; i < n; i++) {
                if (curve[i].x >= t) {
                    const { x: x0, y: y0, outTangent: out0 } = curve[i - 1];
                    const { x: x1, y: y1, inTangent: in1 } = curve[i];
                    const rate0 = (t - x0) / (x1 - x0);
                    const rate1 = (t - x1) / (x0 - x1);
                    return (y0 * (1 + 2 * rate0) + out0 * (t - x0)) * rate1 * rate1 + (y1 * (1 + 2 * rate1) + in1 * (t - x1)) * rate0 * rate0;
                }
            }
            return defaultValue;
        }
    }
}


