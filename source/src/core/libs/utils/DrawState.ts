import { MathUtil } from "../math/MathUtil";
import { recyclableV2, recycleItems } from "./Recyclable";
class DrawShape {

}

export class DrawState {
    private _graphics: Laya.Graphics;
    private _min: number = 0;
    private _max: number = 0;
    private _duration: number = 0;
    private _ratio: number = 0;
    private _lengthes: number[] = [];
    private _center = new Laya.Vector2();
    private _directs: Recyclable<Laya.Vector2>[] = [];
    private _starts: Recyclable<Laya.Vector2>[] = [];
    private _targets: Recyclable<Laya.Vector2>[] = [];
    private _updateHandler = Laya.Handler.create(this, this.draw, null, false);

    /**
     * 设置绘制数据
     * @param sp {@link Laya.Sprite} 要绘制的Sprite对象
     * @param count 数量
     * @param min 最小值
     * @param max 最大值
     * @param duration 持续时间
     * @returns 
     */
    setData(sp: Laya.Sprite, count: number, min: number, max: number, duration: number) {
        if (!sp) return;
        Laya.Tween.clearAll(this);
        this._min = min;
        this._max = max;
        this._duration = duration;
        this._graphics = sp.graphics;
        this._center.setValue(sp.width / 2, sp.height / 2);
        const angle = 360 / count;
        const { _directs, _starts, _targets, _lengthes } = this;
        _lengthes.length = 0;
        recycleItems(_directs, _starts, _targets);
        for (let i = 0; i < count; i++) {
            _lengthes.push(0);
            const v2 = recyclableV2()[ 0 ];
            v2.setValue(0, -1);
            _directs.push(v2.rotate(angle * i));
        }
        _directs.forEach(v => {
            const [ start, target ] = recyclableV2(2);
            _starts.push(v.copyTo(start));
            _targets.push(v.copyTo(target));
        });
        this.start();
    }

    private start() {
        this._ratio = 0;
        this._starts.forEach((v, index) => v.copyTo(this._targets[ index ]));
        this._lengthes.forEach((_, index) => this._lengthes[ index ] = MathUtil.RandomInt(this._min, this._max));

        this._directs.forEach((v, index) => v.copyTo(this._starts[ index ]).scale(this._lengthes[ index ]));
        Laya.Tween.to(this, { _ratio: 1 }, this._duration, null, Laya.Handler.create(this, this.start)).update = this._updateHandler;
    }

    private draw() {
        const { _graphics, _directs, _min, _max, _center, _targets, _starts, _ratio, } = this;
        _graphics.clear();

        let maxRange: number[] = _directs.reduce((pv, v) => {
            pv.push(v.x * _max, v.y * _max);
            return pv;
        }, []);
        //画最大范围
        _graphics.drawPoly(_center.x, _center.y, maxRange, "#4657FF");
        const minRange: number[] = _directs.reduce((pv, v) => {
            pv.push(v.x * _min, v.y * _min);
            return pv;
        }, []);
        //画最小范围
        _graphics.drawPoly(_center.x, _center.y, minRange, "#00f0f0");

        let points: number[] = _targets.reduce((pv, v, index) => {
            pv.push(v.x + (_starts[ index ].x - v.x) * _ratio, v.y + (_starts[ index ].y - v.y) * _ratio);
            return pv;
        }, []);
        //画显示区
        _graphics.drawPoly(_center.x, _center.y, points, "#ff000090");
        //画显示区线框
        _graphics.drawLines(_center.x, _center.y, [ ...points, points[ 0 ], points[ 1 ] ], "#ffffff", 2);
        //画圆心
        _graphics.drawCircle(_center.x, _center.y, 4, "#00ff00");
        //画各个显示顶点
        for (let i = points.length - 2; i >= 0; i -= 2) {
            _graphics.drawCircle(_center.x + points[ i ], _center.y + points[ i + 1 ], 4, "#00ff00");
        }

        maxRange.push(...maxRange.reduce((pv, v, index, arr) => {
            if (index % 2 == 0) {
                pv.push(v, arr[ index + 1 ], 0, 0);
            }
            return pv;
        }, []));
        //画线框
        _graphics.drawLines(_center.x, _center.y, maxRange, "#FFE600", 2);
    }
}