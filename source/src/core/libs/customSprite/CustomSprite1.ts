import { BaseCustomSprite } from "./BaseCustomSprite";
class DissValue2D extends Laya.Value2D {
    // constructor(mainID: number, subID: number) {
    //     super(mainID, subID);
    //     this._attribLocation = [ "posuv2", 5 ];
    // }
    public u_Time: number = 0;
    public u_LightWidth:number = 0.2;
    public u_NoiseTex: Laya.Texture2D;
}
export class CustomSprite1 extends BaseCustomSprite<DissValue2D> {

    //定义一个shaderid  用于laya在查找shader 时使用
    static MainID: number = 1000;

    constructor() {
        super();
        this.shaderValue = new DissValue2D(CustomSprite1.MainID, 0);
    }

    /**
     * 设置噪图纹理
     * @param t
     */
    setNoiseTexture(t: Laya.Texture2D) {
        //这里的名字是在shader里 定义好的。
        this.shaderValue.u_NoiseTex = t;
    }

    setNoiseTexSkin(skin: string) {
        Laya.loader.load(skin, new Laya.Handler(this, (tex) => {
            this.shaderValue.u_NoiseTex = tex._getSource();
        }));
    }

    /**
     * 设置消融范围  0 是原图  1 是消失完成
     * @param t
     */
    setDissolveThreshold(t: number) {
        this.shaderValue.u_LightWidth = t;
    }

    protected override onCustomRender(context: Laya.Context, x: number, y: number) {
        this.shaderValue.u_Time += Laya.timer.delta;
    }

}


// private _value: number = 0;

// private aaaa() {
//     const url = "res/ui/PkgCommon_atlas0.png";
//     Laya.loader.load(url, Laya.Handler.create(this, () => {
//         const texture = Laya.Loader.getRes(url);
//         const spe = new CustomSprite1();
//         spe.texture = texture;
//         //设置噪图路径
//         spe.setNoiseTexSkin("mask.png");
//         spe.setDissolveThreshold(0);
//         spe.x = Laya.stage.width / 2 - texture.width / 2;
//         spe.y = Laya.stage.height / 2 - texture.height / 2;
//         Laya.stage.addChild(spe);
//         Laya.stage.on(Laya.Event.KEY_DOWN, this, (e: Laya.Event) => {
//             if (e.keyCode == Laya.Keyboard.A) {
//                 this._value -= 0.01;
//             } else if (e.keyCode == Laya.Keyboard.S) {
//                 this._value += 0.01;
//             } else {
//                 return;
//             }
//             this._value = MathUtil.Clamp01(this._value);
//             console.log(this._value);
//             spe.setDissolveThreshold(this._value);
//         });
//     }));
// }