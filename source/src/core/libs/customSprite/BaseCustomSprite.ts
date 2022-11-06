export class BaseCustomSprite<T extends Laya.Value2D> extends Laya.Sprite {
    private _texture: Laya.Texture;
    protected shaderValue: T;
    override get texture() { return this._texture; }
    override set texture(value: Laya.Texture) {
        if (typeof (value) == "string") {
            this.loadImage(value);
        }
        else if (this._texture != value) {
            this._texture && this._texture[ "_removeReference" ]();
            this._texture = value;
            value && value[ "_addReference" ]();
            this[ "_setTexture" ](value);
            this[ "_setWidth" ](this._texture, this.width);
            this[ "_setHeight" ](this._texture, this.height);
            // if (value)
            //     this._renderType |= SpriteConst.TEXTURE;
            // else
            //     this._renderType &= ~SpriteConst.TEXTURE;
            // this["_setRenderType"](this._renderType);
            // this.repaint();
        }
    }

    constructor() {
        super();
        //重要的一步  将渲染设置为自定义
        this.customRenderEnable = true;
    }

    // 自定义渲染提交
    override customRender(context: Laya.Context, x: number, y: number) {
        this.onCustomRender(context, x, y);
        const { texture, width, height, shaderValue } = this;
        //这一步很重要
        context.drawTarget(texture.bitmap as any, x, y, width, height, null, shaderValue);
    }

    /** 虚函数，使用时重写即可 */
    protected onCustomRender(context: Laya.Context, x: number, y: number) {

    }
}