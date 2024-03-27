export class CameraController extends Laya.Script3D {
    mSpeed = 5;
    rSpeed = 3;
    private mw: boolean;
    private ma: boolean;
    private ms: boolean;
    private md: boolean;
    private mq: boolean;
    private me: boolean;
    private mouseDown: boolean;
    private mouseX: number;
    private mouseY: number;
    override onAwake(): void {
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMMouseUp);
    }

    private onKeyDown(e: Laya.Event) {
        switch (e.keyCode) {
            case Laya.Keyboard.W: this.mw = true; break;
            case Laya.Keyboard.A: this.ma = true; break;
            case Laya.Keyboard.S: this.ms = true; break;
            case Laya.Keyboard.D: this.md = true; break;
            case Laya.Keyboard.Q: this.mq = true; break;
            case Laya.Keyboard.E: this.me = true; break;
            default: return;
        }
    }

    private onKeyUp(e: Laya.Event) {
        switch (e.keyCode) {
            case Laya.Keyboard.W: this.mw = false; break;
            case Laya.Keyboard.A: this.ma = false; break;
            case Laya.Keyboard.S: this.ms = false; break;
            case Laya.Keyboard.D: this.md = false; break;
            case Laya.Keyboard.Q: this.mq = false; break;
            case Laya.Keyboard.E: this.me = false; break;
            default: return;
        }
    }

    private onMMouseDown(e: Laya.Event) {
        this.mouseDown = true;
        this.mouseX = e.stageX;
        this.mouseY = e.stageY;
    }

    private onMMouseMove(e: Laya.Event) {
        if (this.mouseDown) {
            const speed = this.rSpeed * Laya.timer.delta / 1000;
            const dx = (e.stageX - this.mouseX) * speed;
            const dy = (e.stageY - this.mouseY) * speed;
            this.owner.transform.rotate(new Laya.Vector3(dy, dx, 0), true, false);
            this.mouseX = e.stageX;
            this.mouseY = e.stageY;
        }
    }

    private onMMouseUp() {
        this.mouseDown = false;
    }

    override onUpdate(): void {
        const moveDis = Laya.timer.delta * this.mSpeed / 1000;
        const moveV3 = new Laya.Vector3();
        this.mw && (moveV3.z += -moveDis);
        this.ma && (moveV3.x += -moveDis);
        this.ms && (moveV3.z += moveDis);
        this.md && (moveV3.x += moveDis);
        this.mq && (moveV3.y += -moveDis);
        this.me && (moveV3.y += moveDis);
        this.owner.transform.translate(moveV3);
    }

}