
import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Event = Laya.Event;
import Browser = Laya.Browser;
import Stat = Laya.Stat;
import WebGL = Laya.WebGL;

export class LayaExample {
    private n: number = 500;
    private d: number = 1;
    private current: number = 0;
    private objs: number = 17;
    private vx: number = 0;
    private vy: number = 0;
    private vz: number = 0;
    private points1: number[] = [];
    private points2: number[] = [];
    private points3: number[] = [];
    private tpoint1: number[] = [];
    private tpoint2: number[] = [];
    private tpoint3: number[] = [];
    private balls: Sprite[] = [];
    private text: Laya.Text;

    constructor() {

        this.setup();
    }

    private setup(): void {
        Laya.stage.on(Event.RESIZE, this, this.onResize);

        this.makeObject(0);
        this.text = new Laya.Text();
        this.text.fontSize = 40;
        this.text.color = "#ffffff";
        this.text.zOrder = 5;
        Laya.stage.addChild(this.text);

        for (var i: number = 0; i < this.n; i++) {
            this.tpoint1[ i ] = this.points1[ i ];
            this.tpoint2[ i ] = this.points2[ i ];
            this.tpoint3[ i ] = this.points3[ i ];

            var tempBall: Sprite = new Sprite();
            tempBall.loadImage('res/aaaa.png');
            tempBall.pivot(3, 3);
            tempBall.alpha = 0.5;
            this.balls[ i ] = tempBall;

            Laya.stage.addChild(tempBall);
        }

        this.onResize();
        Laya.stage.on(Laya.Event.CLICK, this, this.lastObject);
        Laya.stage.on(Laya.Event.RIGHT_CLICK, this, this.nextObject);
        Laya.stage.on(Laya.Event.KEY_PRESS, this, () => {
            this.vx += 0.0075;
            this.vy += 0.0075;
            this.vz += 0.0075;
        });

        // Laya.timer.loop(5000, this, this.nextObject);
        Laya.timer.frameLoop(1, this, this.update);
    }

    private lastObject(): void {
        this.current--;

        if (this.current < 0) {
            this.current = 17;
        }

        this.makeObject(this.current);
        console.error(this.points1);
        console.error(this.points2);
        console.error(this.points3);
        console.error(this.tpoint1);
        console.error(this.tpoint2);
        console.error(this.tpoint3);
    }

    private nextObject(): void {
        this.current++;

        if (this.current > this.objs) {
            this.current = 0;
        }

        this.makeObject(this.current);
        console.error(this.points1);
        console.error(this.points2);
        console.error(this.points3);
        console.error(this.tpoint1);
        console.error(this.tpoint2);
        console.error(this.tpoint3);
    }

    private makeObject(t: number): void {
        var xd: number;
        var i: number;

        switch (t) {
            case 0:
                for (i = 0; i < this.n; i++) {
                    this.points1[ i ] = -50 + Math.round(Math.random() * 100);
                    this.points2[ i ] = 0;
                    this.points3[ i ] = 0;
                }
                break;

            case 1:
                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(t * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(xd) * 10) * (Math.sin(t * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 2:
                for (i = 0; i < this.n; i++) {
                    xd = -90 + (Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(t * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(xd) * 10) * (Math.sin(t * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 3:
                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);
                    this.points2[ i ] = (Math.cos(xd) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 4:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);
                    this.points2[ i ] = (Math.cos(xd) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 5:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);


                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 6:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 7:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(i * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 8:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(i * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 9:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 10:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.cos(xd) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 11:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.sin(xd) * 10) * (Math.sin(i * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 12:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);
                    this.points2[ i ] = (Math.sin(xd) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 13:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.sin(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 14:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.sin(xd) * 10) * (Math.cos(xd) * 10);
                    this.points2[ i ] = (Math.sin(xd) * 10) * (Math.sin(i * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 15:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.sin(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;

            case 16:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(i * 360 / this.n) * 10);
                    this.points2[ i ] = (Math.sin(i * 360 / this.n) * 10) * (Math.sin(xd) * 10);
                    this.points3[ i ] = Math.sin(xd) * 100;
                }
                break;

            case 17:

                for (i = 0; i < this.n; i++) {
                    xd = -90 + Math.round(Math.random() * 180);
                    this.points1[ i ] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);
                    this.points2[ i ] = (Math.cos(i * 360 / this.n) * 10) * (Math.sin(i * 360 / this.n) * 10);
                    this.points3[ i ] = Math.sin(i * 360 / this.n) * 100;
                }
                break;
        }

    }

    private onResize(): void {

    }

    private update(): void {
        var x3d: number, y3d: number, z3d: number, tx: number, ty: number, tz: number, ox: number;

        if (this.d < 200) {
            this.d++;
        }

        // this.vx += 0.0075;
        // this.vy += 0.0075;
        // this.vz += 0.0075;
        this.text.text = "当前：" + this.current + "\n"
            + "d：" + this.d + "\n"
            + "vx：" + this.vx + "\n"
            + "vy：" + this.vy + "\n"
            + "vz：" + this.vz + "\n";

        for (var i: number = 0; i < this.n; i++) {
            if (this.points1[ i ] > this.tpoint1[ i ]) {
                this.tpoint1[ i ] = this.tpoint1[ i ] + 1;
            }
            if (this.points1[ i ] < this.tpoint1[ i ]) {
                this.tpoint1[ i ] = this.tpoint1[ i ] - 1;
            }
            if (this.points2[ i ] > this.tpoint2[ i ]) {
                this.tpoint2[ i ] = this.tpoint2[ i ] + 1;
            }
            if (this.points2[ i ] < this.tpoint2[ i ]) {
                this.tpoint2[ i ] = this.tpoint2[ i ] - 1;
            }
            if (this.points3[ i ] > this.tpoint3[ i ]) {
                this.tpoint3[ i ] = this.tpoint3[ i ] + 1;
            }
            if (this.points3[ i ] < this.tpoint3[ i ]) {
                this.tpoint3[ i ] = this.tpoint3[ i ] - 1;
            }

            x3d = this.tpoint1[ i ];
            y3d = this.tpoint2[ i ];
            z3d = this.tpoint3[ i ];

            ty = (y3d * Math.cos(this.vx)) - (z3d * Math.sin(this.vx));
            tz = (y3d * Math.sin(this.vx)) + (z3d * Math.cos(this.vx));
            tx = (x3d * Math.cos(this.vy)) - (tz * Math.sin(this.vy));
            tz = (x3d * Math.sin(this.vy)) + (tz * Math.cos(this.vy));
            ox = tx;
            tx = (tx * Math.cos(this.vz)) - (ty * Math.sin(this.vz));
            ty = (ox * Math.sin(this.vz)) + (ty * Math.cos(this.vz));

            this.balls[ i ].x = (512 * tx) / (this.d - tz) + Laya.stage.width / 2;
            this.balls[ i ].y = (Laya.stage.height / 2) - (512 * ty) / (this.d - tz);
        }
    }
}