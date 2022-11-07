import { Util } from "../../utils/Util";
import { ItemBase } from "./ItemBase";

export class Equipment extends ItemBase {
    uid: string = Util.CreateUID();
    star: number = 0;
    level: number = 0;
    mingKe: number = 0;
    shenYou: number = 0;
    constructor(id: number) {
        super(id, 1);
    }
}