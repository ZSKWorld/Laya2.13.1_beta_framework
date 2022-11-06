import { CustomSprite1 } from "./CustomSprite1";
import { SpriteVS, PS_CS1 } from "./CustomSpriteConst";

export class CustomSpriteManager {
    static init(){
        Laya.Shader.preCompile2D(0, CustomSprite1.MainID, SpriteVS, PS_CS1, null);
    }
}