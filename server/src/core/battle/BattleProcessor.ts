export class BattleProcessor {
    user: IUser;
    private _inBattle: Boolean = false;
    private _battleInfo: IEnterBattleInput;
    get inBattle() { return this._inBattle; }

    start(info: IEnterBattleInput) {
        if (this._inBattle) return;
        this._battleInfo = info;
        this._inBattle = true;
    }

    exit() {
        this._inBattle = false;
        this._battleInfo = null;
    }

    clear() {
        this.exit();
        this.user = null;
    }
}