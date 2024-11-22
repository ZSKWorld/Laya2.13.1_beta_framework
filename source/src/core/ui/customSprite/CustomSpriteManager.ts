import { MathUtil } from "../../game/math/MathUtil";
import { CustomSprite1 } from "./CustomSprite1";
import { PS_CS2, SpriteVS } from "./CustomSpriteConst";

export class CustomSpriteManager {
    static init() {
        Laya.Shader.preCompile2D(0, CustomSprite1.mainID, SpriteVS, PS_CS2, null);
        this.test();
    }

    private static test() {
        Laya.timer.once(1000, this, () => {
            const url = ResPath.TexturePath.Image_2007;
            Laya.loader.load(url, Laya.Handler.create(this, () => {
                const texture = Laya.Loader.getRes(url);
                const spe = new CustomSprite1();
                spe.size(300, 300);
                spe.scale(4, 4);
                spe.texture = texture;
                //设置噪图路径
                // spe.setNoiseTexSkin("mask.png");
                spe.x = Laya.stage.width / 2 - spe.width * spe.scaleX / 2;
                spe.y = Laya.stage.height / 2 - spe.height * spe.scaleY / 2;
                Laya.stage.addChild(spe);
                let value = 0.5;
                spe.setDissolveThreshold(0.5);
                Laya.stage.on(Laya.Event.KEY_DOWN, this, (e: Laya.Event) => {
                    if (e.keyCode == Laya.Keyboard.A) {
                        value -= 0.01;
                    } else if (e.keyCode == Laya.Keyboard.D) {
                        value += 0.01;
                    } else {
                        return;
                    }
                    value = MathUtil.clamp01(value);
                    spe.setDissolveThreshold(value);
                });
            }));
        });
    }
}