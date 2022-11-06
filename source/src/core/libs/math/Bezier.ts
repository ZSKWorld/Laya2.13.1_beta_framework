import { recyclablePoint } from "../utils/Recyclable";

/** 匀速贝塞尔曲线，文档：https://www.freesion.com/article/2280255606/ */
export class Bezier {
    /**普通贝塞尔点 */
    static NormalPoint(start: Point, end: Point, control: Point, t: number) {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const ut2 = u * t * 2;

        const p = recyclablePoint()[ 0 ];
        p.x = uu * start.x;
        p.y = uu * start.y;

        p.x += ut2 * control.x;
        p.y += ut2 * control.y;

        p.x += tt * end.x;
        p.y += tt * end.y;
        return p;
    }

    /**
     * 普通贝塞尔点集合
     * @param start {@link Point} 起始位置
     * @param end {@link Point} 结束位置 
     * @param control {@link Point} 控制点位置 
     * @param pointNum 点数量
     * @returns 
     */
    static NormalPoints(start: Point, end: Point, control: Point, pointNum: number) {
        const points: Recyclable<Laya.Point>[] = [];
        for (let i = 0; i <= pointNum; i++) {
            points.push(this.NormalPoint(start, end, control, i / pointNum))
        }
        return points;
    }

    /**匀速贝塞尔点 */
    static UniformPoint(start: Point, end: Point, control: Point, t: number) {
        let ax = start.x - 2 * control.x + end.x;
        let ay = start.y - 2 * control.y + end.y;
        let bx = 2 * control.x - 2 * start.x;
        let by = 2 * control.y - 2 * start.y;

        let A = 4 * (ax * ax + ay * ay);
        let B = 4 * (ax * bx + ay * by);
        let C = bx * bx + by * by;

        //曲线总长度
        const total_length = this.GetLength(A, B, C, 1);
        //按照线形增长,此时对应的曲线长度
        let l = t * total_length;
        //根据 L 函数的反函数，求得 l 对应的 t 值
        t = this.InvertLength(A, B, C, t, l);
        let _1_t = (1 - t) * (1 - t), _2_1_t = 2 * (1 - t) * t, tt = t * t;
        //根据贝塞尔曲线函数，求得取得此时的x,y坐标
        let x = _1_t * start.x + _2_1_t * control.x + tt * end.x;
        let y = _1_t * start.y + _2_1_t * control.y + tt * end.y;
        const point = recyclablePoint()[ 0 ];
        point.setTo(x, y);
        return point;
    }

    /**
     * 匀速贝塞尔点集合
     * @param start {@link Point} 起始位置
     * @param end {@link Point} 结束位置
     * @param control {@link Point} 控制点位置
     * @param pointNum 点数量
     * @returns 
     */
    static UniformPoints(start: Point, end: Point, control: Point, pointNum: number) {
        let ax = start.x - 2 * control.x + end.x;
        let ay = start.y - 2 * control.y + end.y;
        let bx = 2 * control.x - 2 * start.x;
        let by = 2 * control.y - 2 * start.y;

        let A = 4 * (ax * ax + ay * ay);
        let B = 4 * (ax * bx + ay * by);
        let C = bx * bx + by * by;

        const points: Recyclable<Laya.Point>[] = [];
        //曲线总长度
        const total_length = this.GetLength(A, B, C, 1);
        for (let i = 0; i <= pointNum; i++) {
            let t = i / pointNum;
            //按照线形增长,此时对应的曲线长度
            let l = t * total_length;
            //根据 L 函数的反函数，求得 l 对应的 t 值
            t = this.InvertLength(A, B, C, t, l);
            let _1_t = (1 - t) * (1 - t);
            let _2_1_t = 2 * (1 - t) * t;
            let tt = t * t;
            //根据贝塞尔曲线函数，求得取得此时的x,y坐标
            let x = _1_t * start.x + _2_1_t * control.x + tt * end.x;
            let y = _1_t * start.y + _2_1_t * control.y + tt * end.y;
            points.push(recyclablePoint()[ 0 ].setTo(x, y));
        }
        return points;
    }

    private static GetLength(a: number, b: number, c: number, t: number) {
        let temp1 = Math.sqrt(c + t * (b + a * t));
        let temp2 = (2 * a * t * temp1 + b * (temp1 - Math.sqrt(c)));
        let temp3 = Math.log(b + 2 * Math.sqrt(a) * Math.sqrt(c));
        let temp4 = Math.log(b + 2 * a * t + 2 * Math.sqrt(a) * temp1);
        let temp5 = 2 * Math.sqrt(a) * temp2;
        let temp6 = (b * b - 4 * a * c) * (temp3 - temp4);
        return (temp5 + temp6) / (8 * Math.pow(a, 1.5));
    }

    private static InvertLength(a: number, b: number, c: number, t: number, l: number) {
        let t1 = t, t2: number;
        do {
            t2 = t1 - (this.GetLength(a, b, c, t1) - l) / this.GetSpeed(a, b, c, t1);
            if (Math.abs(t1 - t2) < 0.000001) // 如果几乎不再变化，即收敛
                break;
            t1 = t2;
        } while (true);
        return t2;
    }


    /**速度函数 s(t_) = Sqrt[A*t*t+B*t+C] */
    private static GetSpeed(a: number, b: number, c: number, t: number) {
        return Math.sqrt(a * t * t + b * t + c);
    }
}
windowImmit("Bezier", Bezier);