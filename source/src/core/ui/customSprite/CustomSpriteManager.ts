import { CustomSprite1 } from "./CustomSprite1";
import { PS_CS1, SpriteVS } from "./CustomSpriteConst";

export class CustomSpriteManager {
    static Init() {
        Laya.Shader.preCompile2D(0, CustomSprite1.MainID, SpriteVS, PS_CS1, null);
    }
}