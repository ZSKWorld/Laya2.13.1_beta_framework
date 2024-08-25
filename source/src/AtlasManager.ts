import { MathUtil } from "./core/game/math/MathUtil";

class Point {
    private _x: number = 0;
    private _y: number = 0;
    get x() { return this._x; }
    set x(value) { this._x = Math.max(value, 0); }
    get y() { return this._y; }
    set y(value) { this._y = Math.max(value, 0); }
    constructor(x: number = 0, y: number = 0,) {
        this.x = x;
        this.y = y;
    }

    setXY(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    reset() {
        this.x = this.y = 0;
    }
}

export class Rect extends Point {
    private _w: number = 0;
    private _h: number = 0;
    get w() { return this._w; }
    set w(value) { this._w = Math.max(value, 0); }
    get h() { return this._h; }
    set h(value) { this._h = Math.max(value, 0); }
    get xMax() { return this.x + this.w; }
    get yMax() { return this.y + this.h; }
    static count = 0;
    constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
        super(x, y);
        this.w = w;
        this.h = h;
        Rect.count++;
    }

    static create(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
        const rect = Laya.Pool.createByClass(Rect);
        return rect.setXY(x, y).setSize(w, h);
    }

    static recover(rect: Rect) {
        rect.reset();
        Laya.Pool.recoverByClass(rect);
    }

    setSize(w: number = 0, h: number = 0) {
        let a: Laya.Rectangle;
        this.w = w;
        this.h = h;
        return this;
    }

    overlaps(other: Rect) {
        return !(this.x >= other.xMax || this.xMax <= other.x || this.y >= other.yMax || this.yMax <= other.y);
    }

    getOverlap(other: Rect, out?: Rect) {
        if (out) out.reset();
        else out = Rect.create();
        if (this.overlaps(other)) {
            const ltX = Math.max(this.x, other.x);
            const ltY = Math.max(this.y, other.y);
            const rbX = Math.min(this.xMax, other.xMax);
            const rbY = Math.min(this.yMax, other.yMax);
            out.setXY(ltX, ltY).setSize(rbX - ltX, rbY - ltY);
        }
        return out;
    }
    contain(rect2: Rect) {
        return this.x <= rect2.x && this.xMax >= rect2.xMax && this.y <= rect2.y && this.yMax >= rect2.yMax;
    }

    clone() {
        const rect = Rect.create();
        rect.x = this.x;
        rect.y = this.y;
        rect.w = this.w;
        rect.h = this.h;
        return rect;
    }

    override reset() {
        super.reset();
        this.w = this.h = 0;
    }
}

const TmpRect0 = new Rect();
const TmpRect1 = new Rect();
const TmpRect2 = new Rect();

class TextureInfo extends Rect {
    index: number = 0;
}

class AtlasGrid {
    maxSize: number = 1024;
    maxSingleSize: number = 256;
    /** 图片间距 */
    padding: number = 2;
    /** 2次幂 */
    power2: boolean = false;
    /** 方形 */
    squared: boolean = true;
    curArea: Rect = Rect.create();
    outSideArea: Rect = Rect.create();
    freeAreas: Rect[] = [];
    splitAreas: Rect[] = [];
    textures: TextureInfo[] = [];

    init(maxSize: number, maxSingleSize: number = 256, padding: number = 2, power2: boolean = false, squared: boolean = false) {
        this.reset();
        this.maxSize = maxSize;
        this.maxSingleSize = maxSingleSize;
        this.padding = padding;
        this.power2 = power2;
        this.squared = squared;
        this.outSideArea.setXY(maxSize + 1, maxSize + 1);
        this.freeAreas.forEach(Rect.recover);
        this.freeAreas.length = 0;
        this.freeAreas.push(Rect.create(0, 0, this.maxSize, this.maxSize));
    }

    insert(tex: TextureInfo) {
        const { maxSize, maxSingleSize } = this;
        if (tex.w > maxSize || tex.h > maxSize) return false;
        if (tex.w > maxSingleSize || tex.h > maxSingleSize) return false;
        return this.insert2(tex);
    }
    
    useRatio() {
        let useArea = 0;
        this.textures.forEach(v => {
            const w = v.w + Math.min(this.maxSize - v.xMax, this.padding);
            const h = v.h + Math.min(this.maxSize - v.yMax, this.padding);
            useArea += w * h;
        });
        const totalArea = this.maxSize * this.maxSize;
        return Math.floor(useArea / totalArea * 10000) / 100;
    }
    // def useRatio(self):
    //     freeArea = 0
    //     freeCnt = len(self.freeAreas)
    //     for i in range(0, freeCnt):
    //         v = self.freeAreas[i]
    //         TmpRect0.setXY(v.get_x(), v.get_y()).setSize(v.get_w(), v.get_h())
    //         if TmpRect0.xMax() < self.maxSize:
    //             TmpRect0.set_w(TmpRect0.get_w() - self.padding)
    //         if TmpRect0.yMax() < self.maxSize:
    //             TmpRect0.set_h(TmpRect0.get_h() - self.padding)
    //         print("area 1 ", freeArea, TmpRect0.get_w(), TmpRect0.get_h())
    //         freeArea = freeArea + TmpRect0.get_w() * TmpRect0.get_h()
    //         for j in range(i + 1, freeCnt):
    //             v1 = self.freeAreas[j]
    //             TmpRect1.setXY(v1.get_x(), v1.get_y()).setSize(v1.get_w(), v1.get_h())
    //             if TmpRect1.xMax() < self.maxSize:
    //                 TmpRect1.set_w(TmpRect1.get_w() - self.padding)
    //             if TmpRect1.yMax() < self.maxSize:
    //                 TmpRect1.set_h(TmpRect1.get_h() - self.padding)
    //             TmpRect0.getOverlap(TmpRect1, TmpRect2)
    //             print("area 2 ", freeArea, TmpRect0.get_x(), TmpRect0.get_y(), TmpRect0.get_w(), TmpRect0.get_h(), TmpRect1.get_x(), TmpRect1.get_y(), TmpRect1.get_w(), TmpRect1.get_h(), TmpRect2.get_x(), TmpRect2.get_y(),TmpRect2.get_w(), TmpRect2.get_h())
    //             freeArea = freeArea - TmpRect2.get_w() * TmpRect2.get_h()
    //     totalArea = self.maxSize * self.maxSize
    //     return int((1 - freeArea / totalArea) * 10000) / 100

    private insert2(tex: TextureInfo) {
        const { padding, curArea, freeAreas, splitAreas } = this;
        const index = this.getFreeAreaIndex(tex.w, tex.h);
        const targetArea = freeAreas[index];
        if (targetArea) {
            const texWithPadding = TmpRect0.setXY(targetArea.x, targetArea.y).setSize(tex.w + padding, tex.h + padding);
            let count = 0;
            for (let i = freeAreas.length - 1; i >= 0; i--) {
                const v = freeAreas[i];
                if (v.overlaps(texWithPadding)) {
                    count = 0;
                    if (texWithPadding.x - v.x > 0) {
                        count++;
                        splitAreas.push(Rect.create(v.x, v.y, texWithPadding.x - v.x, v.h));
                    }
                    if (v.xMax - texWithPadding.xMax > 0) {
                        count++;
                        splitAreas.push(Rect.create(texWithPadding.xMax, v.y, v.xMax - texWithPadding.xMax, v.h));
                    }
                    if (texWithPadding.y - v.y > 0) {
                        count++;
                        splitAreas.push(Rect.create(v.x, v.y, v.w, texWithPadding.y - v.y));
                    }
                    if (v.yMax - texWithPadding.yMax > 0) {
                        count++;
                        splitAreas.push(Rect.create(v.x, texWithPadding.yMax, v.w, v.yMax - texWithPadding.yMax));
                    }
                    if (count == 0 && (texWithPadding.w < v.w || texWithPadding.h < v.h)) {
                        splitAreas.push(v);
                    } else Rect.recover(v);

                    const topOfStack = freeAreas.pop();
                    if (i < freeAreas.length) freeAreas[i] = topOfStack;
                }
            }
            this.filterSelfSubAreas(splitAreas);
            splitAreas.forEach(v => freeAreas.push(v));
            splitAreas.length = 0;
            tex.setXY(texWithPadding.x, texWithPadding.y);
            this.textures.push(tex);
            curArea.setSize(Math.max(texWithPadding.x + tex.w, curArea.w), Math.max(texWithPadding.y + tex.h, curArea.h));
            return true;
        }
        else return false;
    }

    private getFreeAreaIndex(width: number, height: number) {
        const { padding, curArea, freeAreas, outSideArea, squared } = this;
        let best = outSideArea;
        let index = -1, squareRate = 0, area = Number.MAX_SAFE_INTEGER;
        const paddedWidth = width + padding;
        const paddedHeight = height + padding;
        for (let i = freeAreas.length - 1; i >= 0; i--) {
            const free = freeAreas[i];
            if (paddedWidth <= free.w && paddedHeight <= free.h) {
                const newCurW = Math.max(free.x + width, curArea.w);
                const newCurH = Math.max(free.y + height, curArea.h);
                if (squared) {
                    const rate = Math.min(newCurW, newCurH) / Math.max(newCurW, newCurH);
                    if (rate > squareRate || (rate == squareRate && (free.x < freeAreas[index].x || free.y < freeAreas[index].y))) {
                        index = i;
                        squareRate = rate;
                    }
                } else {
                    const addW = newCurW - curArea.w;
                    const addH = newCurH - curArea.h;
                    const newArea = addW * curArea.h + addH * curArea.w + addW * addH;
                    if (newArea < area || (newArea == area && (free.x < freeAreas[index].x || free.y < freeAreas[index].y))) {
                        index = i;
                        area = newArea;
                    }
                }
            }
        }
        // for (let i = freeAreas.length - 1; i >= 0; i--) {
        //     const free = freeAreas[i];
        //     if (squared) {
        //         if (free.x < curArea.w || free.y < curArea.h) {
        //             if (paddedWidth <= free.w && paddedHeight <= free.h) {
        //                 const newCurW = Math.max(free.x + width, curArea.w);
        //                 const newCurH = Math.max(free.y + height, curArea.h);
        //                 const rate = Math.min(newCurW, newCurH) / Math.max(newCurW, newCurH);
        //                 if (rate > squareRate) {
        //                     index = i;
        //                     squareRate = rate;
        //                 }
        //             }
        //         } else {
        //             if (width <= free.w && height <= free.h) {
        //                 const newCurW = Math.max(free.x + width, curArea.w);
        //                 const newCurH = Math.max(free.y + height, curArea.h);
        //                 const rate = Math.min(newCurW, newCurH) / Math.max(newCurW, newCurH);
        //                 if (rate > squareRate) {
        //                     index = i;
        //                     squareRate = rate;
        //                 }
        //             }
        //         }
        //     } else {
        //         if (free.x < curArea.w || free.y < curArea.h) {
        //             if (free.x < best.x && paddedWidth <= free.w && paddedHeight <= free.h) {
        //                 index = i;
        //                 if ((paddedWidth == free.w && free.w <= free.h) || (paddedHeight == free.h && free.h <= free.w))
        //                     break;
        //                 best = free;
        //             }
        //         } else {
        //             if (free.x < best.x && width <= free.w && height <= free.h) {
        //                 index = i;
        //                 if ((width == free.w && free.w <= free.h) || (height <= free.h && free.h <= free.w))
        //                     break;
        //                 best = free;
        //             }
        //         }
        //     }
        // }
        return index;
    }

    private filterSelfSubAreas(areas: Rect[]): void {
        let i = 0, j = 0;
        for (i = areas.length - 1; i >= 0; i--) {
            const filtered = areas[i];
            for (j = areas.length - 1; j >= 0; j--) {
                if (i != j) {
                    const area = areas[j];
                    if (area.contain(filtered)) {
                        Rect.recover(filtered);
                        const topOfStack = areas.pop();
                        if (i < areas.length) {
                            areas[i] = topOfStack;
                        }
                        break;
                    }
                }
            }
        }
    }

    private reset() {
        this.maxSize = 1024;
        this.maxSingleSize = 256;
        this.padding = 2;
        this.power2 = false;
        this.squared = false;
        this.curArea.reset();
        this.freeAreas.forEach(Rect.recover);
        this.freeAreas.length = 0;
        this.freeAreas.push(Rect.create(0, 0, this.maxSize, this.maxSize));
        this.textures.length = 0;
    }
}

export class AtlasManager {
    private static _inst: AtlasManager;
    static get Inst() {
        return this._inst || (this._inst = new AtlasManager());
    }
    textures: TextureInfo[] = [];
    atlasGrids: AtlasGrid[] = [];
    sprite: Laya.Sprite;
    count = 1;
    speed = 10;
    constructor() {
        this.sprite = new Laya.Sprite();
        this.sprite.size(1080, 1920);
        this.sprite.mouseEnabled = true;
        // this.sprite.scale(2, 2);
        Laya.stage.addChild(this.sprite);
        this.sprite.on(Laya.Event.MOUSE_WHEEL, this, (e:Laya.Event) => {
            this.sprite.y += e.delta * this.speed;
        });
    }

    createTex(count: number) {
        this.count = count;
        for (let i = 0; i < count; i++) {
            if (!this.textures[i])
                this.textures[i] = new TextureInfo(0, 0, MathUtil.RandomInt(100, 200), MathUtil.RandomInt(100, 200));
        }
    }

    packAtlas() {
        console.time();
        this.atlasGrids.forEach(v => v.init(900, 512, 1, false, true));
        this.textures.forEach(v => {
            let success = false;
            for (let i = 0; i < this.atlasGrids.length; i++) {
                success = this.atlasGrids[i].insert(v);
                if (success) {
                    v.index = i;
                    break;
                }
            }
            if (!success) {
                const atlasGrid = new AtlasGrid();
                atlasGrid.init(900, 512, 1, false, true);
                success = atlasGrid.insert(v);
                if (success) v.index = this.atlasGrids.length;
                else console.error("inser error");
                this.atlasGrids.push(atlasGrid);
            }
        });
        console.timeEnd(this.atlasGrids.length.toString());
        this.drawRect();
    }

    drawRect() {
        this.sprite.graphics.clear();
        this.sprite.graphics.drawRect(0, 0, 1080, this.sprite.height, "#ffffff");
        let height = this.sprite.height;
        this.atlasGrids.forEach((v, i) => {
            const row = i; //Math.floor(i / 2);
            const col = 0; //i % 2;
            const startX = col * 900 + (col + 1) * 90;
            const startY = row * 900 + (row + 1) * 40;
            height = Math.max(height, startY + 900 + 40);
            v.textures.forEach((tv, j) => {
                this.sprite.graphics.drawRect(tv.x + startX, tv.y + startY, tv.w, tv.h, this.randomColor());
            });
            v.freeAreas.forEach((fv, j) => {
                this.sprite.graphics.drawRect(fv.x + startX, fv.y + startY, fv.w, fv.h, null, this.randomColor());
            });
            this.sprite.graphics.fillText(i.toString(), startX, startY, "40px Arial", "#000000", "left");
        });
        this.sprite.height = height;
    }
    private randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return "#" + r.toString(16).padStart(2, "0")
            + g.toString(16).padStart(2, "0")
            + b.toString(16).padStart(2, "0");
    }
}
windowImmit("AtlasManager", AtlasManager);