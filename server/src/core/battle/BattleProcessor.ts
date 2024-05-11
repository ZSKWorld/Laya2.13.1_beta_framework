
export class BattleProcessor {
    private _user: IUser;
    private _inBattle: Boolean = false;
    private _battleInfo: IEnterBattleInput;
    get inBattle() { return this._inBattle; }

    init(user: IUser) {
        this._user = user;
    }

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
        this._user = null;
    }
}