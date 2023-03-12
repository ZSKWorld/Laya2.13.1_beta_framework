import { AtlasGrid } from "./AtlasGrid";
interface ITexture {
    x: number;
    y: number;
    idx: number;
    width: number;
    height: number;
}

export class AtlasManager2 {
    private static _inst: AtlasManager2;
    static get Inst() {
        return this._inst || (this._inst = new AtlasManager2());
    }

    private _targetWidth: number;
    private _targetHeight: number;
    private _padding: number;
    private _atlasId: number = 0;
    private _atlases: AtlasGrid[] = [];
    private _textures: ITexture[] = [];
    private _tmpAtlasPos = new Laya.Point();

    private _drawScale: number;

    private constructor() { }

    createAtlas(width: number, height: number, textureCount: number, maxSize: number, padding: number, drawScale: number) {
        this._targetWidth = width;
        this._targetHeight = height;
        this._padding = padding;
        this._drawScale = drawScale;
        this._textures.length = 0;
        this.randomTextures(textureCount, maxSize);
        this._textures.forEach(v => this.addTexture(v));
        this.drawAtlas();
    }

    private addTexture(data: ITexture) {
        var w = data.width + this._padding;
        var h = data.height + this._padding;
        var sz = this._atlases.length;
        let atlas: AtlasGrid;
        var find = false;
        let findIndex = sz;
        for (var i = 0; i < sz; i++) {
            atlas = this._atlases[ i ];
            find = this.getAEmpty(atlas, w, h, this._tmpAtlasPos);
            if (find) {
                findIndex = i;
                break;
            }
        }
        if (!find) {
            atlas = new AtlasGrid(this._targetWidth, this._targetHeight, this._atlasId++);
            this._atlases.push(atlas);
            find = this.getAEmpty(atlas, w, h, this._tmpAtlasPos);
            if (!find) {
                throw 'err1';
            }
        }
        if (find) {
            // atlas.texture.addChar(data, this._tmpAtlasPos.x, this._tmpAtlasPos.y, ri.uv);
            // ri.tex = atlas.texture;
            data.idx = findIndex;
            data.x = this._tmpAtlasPos.x;
            data.y = this._tmpAtlasPos.y;
        }
        return atlas;
    }

    private getAEmpty(atlasGrid: AtlasGrid, w: number, h: number, pt: Laya.Point) {
        var find = atlasGrid.addRect(1, w, h, pt);
        return find;
    }

    private randomTextures(count: number, maxSize: number) {
        for (let i = 0; i < count; i++) {
            this._textures.push({
                x: 0, y: 0, idx: 0,
                width: Math.floor(Math.random() * maxSize + 1),
                height: Math.floor(Math.random() * maxSize + 1),
            });
        }
        this._textures.sort((a, b) => {
            if (a.width > b.width) return -1;
            else if (a.width < b.width) return 1;
            else {
                if (a.height > b.height) return -1;
                else if (a.height < b.height) return 1;
                else return 0;
            }

            return b.width * b.height - a.width * a.height;

            // if (a.width > b.width) return 1;
            // else if (a.width < b.width) return -1;
            // else {
            //     if (a.height > b.height) return -1;
            //     else if (a.height < b.height) return 1;
            //     else return 0;
            // }
        });
    }

    private drawAtlas() {
        const graphics = Laya.stage.graphics;
        graphics.clear();
        const { _targetWidth, _targetHeight, _drawScale } = this;
        this._atlases.forEach((v, index) => graphics.drawRect(25, _targetHeight * index + 25, _targetWidth / _drawScale, _targetHeight / _drawScale, "#ffffff"));

        console.log(this._textures);
        this._textures.forEach((v, index) => {
            const startX = 25;
            const startY = v.idx * _targetHeight + 25;
            const x = startX + v.x / _drawScale;
            const y = startY + v.y / _drawScale;
            const width = v.width / _drawScale;
            const height = v.height / _drawScale;
            console.log(x, y, width, height);
            graphics.drawLine(x, y, x + width, y, "#ff0000");
            graphics.drawLine(x + width, y, x + width, y + height, "#ff0000");
            graphics.drawLine(x + width, y + height, x, y + height, "#ff0000");
            graphics.drawLine(x, y + height, x, y, "#ff0000");
        });
    }
}